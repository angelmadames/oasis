import { githubConfig } from '../config/github';
import httpHandlers from './http/handlers';
import httpHeaders from './http/headers';

export const removeGitHubUserFromOrg = async (
  username: string,
  org: string = githubConfig.orgId,
) => {
  try {
    const body = JSON.stringify({ membershipStatus: 'INACTIVE' });
    const result: Response = await fetch(
      `${githubConfig.apiUrl}/org/${org}/members/${username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: httpHeaders.bearerAuth(githubConfig.token),
        },
      },
    );

    await httpHandlers.response(result);
    console.log('Deactivation completed!');
  } catch (error) {
    console.error('Error deactivating GitHub user:', error);
    process.exit(1);
  }
};
