import { jiraAdminConfig, jiraConfig } from '../config/jira';
import httpHandlers from './http/handlers';
import httpHeaders from './http/headers';
import logger from './logger';

type JiraUser = {
  self?: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls?: { [key: string]: string };
  displayName: string;
  active: boolean;
  timeZone?: string;
  locale?: string;
};

export const inviteJiraUser = async (accountId: string) => {
  try {
    const body = JSON.stringify({ emailAddress: accountId });
    const result: Response = await fetch(`${jiraConfig.apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${jiraConfig.userId}:${jiraConfig.apiKey}`,
        ).toString('base64')}`,
      },
      body: body,
    });

    await httpHandlers.response(result);
    logger.info('Invitation sent!');
  } catch (error) {
    console.error('Error inviting user:', error);
    process.exit(1);
  }
};

export const findJiraUserByEmail = async (email: string): Promise<JiraUser> => {
  try {
    const result: Response = await fetch(
      `${jiraConfig.apiUrl}/user/search?query=${email}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: httpHeaders.basicAuth(
            jiraConfig.userId,
            jiraConfig.apiKey,
          ),
        },
      },
    );

    const response = await httpHandlers.response(result);
    const data = (await response.json()) as JiraUser[];
    return data[0] as JiraUser;
  } catch (error) {
    console.error('Error fetching Jira user data:', error);
    process.exit(1);
  }
};

export const deactivateJiraUser = async (accountId: string) => {
  try {
    const result: Response = await fetch(
      `${jiraAdminConfig.adminApiUrl}/users/${accountId}/manage/lifecycle/disable`,
      {
        method: 'POST',
        headers: {
          Authorization: httpHeaders.bearerAuth(jiraAdminConfig.adminApiKey),
          'Content-Type': 'application/json',
        },
      },
    );

    await httpHandlers.response(result);
  } catch (error) {
    console.error('Error deactivating user:', error);
    process.exit(1);
  }
};

export const activateJiraUser = async (accountId: string) => {
  try {
    const result: Response = await fetch(
      `${jiraAdminConfig.adminApiUrl}/users/${accountId}/manage/lifecycle/enable`,
      {
        method: 'POST',
        headers: {
          Authorization: httpHeaders.bearerAuth(jiraAdminConfig.adminApiKey),
          'Content-Type': 'application/json',
        },
      },
    );

    await httpHandlers.response(result);
  } catch (error) {
    console.error('Error activating user:', error);
    process.exit(1);
  }
};
