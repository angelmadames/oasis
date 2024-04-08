interface ClockifyAuthParams {
  apiKey: string;
  apiUrl: string;
  worksapceId: string;
}

class ClockifyConfig {
  apiKey: string;
  apiUrl: string;
  workspaceId: string;

  constructor({ apiKey, apiUrl, worksapceId }: ClockifyAuthParams) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.workspaceId = worksapceId;
  }
}

export const clockifyConfig = new ClockifyConfig({
  apiKey: process.env.CLOCKIFY_API_KEY || '',
  apiUrl: process.env.CLOCKIFY_API_URL || 'https://api.clockify.me/api/v1',
  worksapceId: process.env.CLOCKIFY_WORKSPACE_ID || '5e874d6e741ff546616fdc0d',
});
