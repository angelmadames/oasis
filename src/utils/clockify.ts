import { clockifyConfig } from '../config/clockify';
import httpHandlers from './http/handlers';
import logger from './logger';

type ClockifyUser = {
  id: string;
  email: string;
  name: string;
  memberships?: [];
  profilePicture: string;
  activeWorkspace: string;
  defaultWorkspace: string;
  summaryReportSettings: object;
  settings: object;
  status: 'ACTIVE' | 'INACTIVE';
  customFields: [];
};

export const findClockifyByEmail = async (
  email: string,
): Promise<ClockifyUser> => {
  try {
    const result: Response = await fetch(
      `${clockifyConfig.apiUrl}/workspaces/${clockifyConfig.workspaceId}/users?email=${email}`,
      {
        method: 'GET',
        headers: {
          'x-api-key': clockifyConfig.apiKey,
        },
      },
    );

    const response = await httpHandlers.response(result);
    const data = (await response.json()) as ClockifyUser[];
    return data[0] as ClockifyUser;
  } catch (error) {
    console.error('Error fetching Clockify user data:', error);
    process.exit(1);
  }
};

export const deactivateClockifyUser = async (userId: string) => {
  try {
    const body = JSON.stringify({ membershipStatus: 'INACTIVE' });
    const result: Response = await fetch(
      `${clockifyConfig.apiUrl}/workspaces/${clockifyConfig.workspaceId}/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'x-api-key': clockifyConfig.apiKey,
        },
        body: body,
      },
    );

    await httpHandlers.response(result);
    logger.info('Deactivation completed!');
  } catch (error) {
    console.error('Error deactivating Clockify user:', error);
    process.exit(1);
  }
};
