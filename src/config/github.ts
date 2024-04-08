interface GitHubAuthParams {
  token: string;
  apiUrl: string;
  orgId: string;
}

class GitHubConfig {
  token: string;
  apiUrl: string;
  orgId: string;

  constructor({ token, apiUrl, orgId }: GitHubAuthParams) {
    this.token = token;
    this.apiUrl = apiUrl;
    this.orgId = orgId;
  }
}

export const githubConfig = new GitHubConfig({
  token: process.env.GITHUB_TOKEN || '',
  apiUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
  orgId: process.env.GITHUB_OWNER || '',
});
