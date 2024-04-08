interface JiraUserAuthParams {
  siteUrl: string;
  userId: string;
  apiKey: string;
}

class JiraUserConfig {
  apiVersion?: 3;
  siteUrl: string;
  apiUrl: string;
  userId: string;
  apiKey: string;

  constructor({
    siteUrl = 'https://atlassian.net',
    userId = '',
    apiKey = '',
  }: JiraUserAuthParams) {
    this.apiVersion = 3;
    this.siteUrl = siteUrl;
    this.apiUrl = `${this.siteUrl}/rest/api/${this.apiVersion}`;
    this.apiKey = apiKey;
    this.userId = userId;
  }
}

interface JiraAdminAuthParams {
  orgId: string;
  adminApiKey: string;
}

class JiraAdminConfig {
  adminApiUrl: string;
  orgId: string;
  adminApiKey: string;

  constructor({ orgId, adminApiKey }: JiraAdminAuthParams) {
    this.adminApiUrl = 'https://api.atlassian.com';
    this.orgId = orgId || '';
    this.adminApiKey = adminApiKey || '';
  }
}

export const jiraAdminConfig = new JiraAdminConfig({
  orgId: String(process.env.JIRA_ADMIN_ORG_ID),
  adminApiKey: String(process.env.JIRA_ADMIN_API_KEY),
});

export const jiraConfig = new JiraUserConfig({
  siteUrl: String(process.env.JIRA_SITE_URL),
  userId: String(process.env.JIRA_USER_ID),
  apiKey: String(process.env.JIRA_API_KEY),
});

export default jiraConfig;
