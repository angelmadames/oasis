import { Command } from 'commander';
import { githubConfig } from '../../config/github';
import confirmAction from '../../utils/confirm-action';
import { removeGitHubUserFromOrg } from '../../utils/github';
import logger from '../../utils/logger';
import { sharedOptions } from '../../utils/shared-options';
export const githubOffboardCommand = () => {
  const command = new Command();
  command
    .name('github')
    .summary('Remove user as member from GitHub organization')
    .addOption(sharedOptions.username().makeOptionMandatory())
    .requiredOption(
      '-o, --org',
      'GitHub Organization where to remove user membership',
      githubConfig.orgId,
    )
    .addOption(sharedOptions.force())
    .action(async (options) => {
      // Log useful information for operator
      logger.info(`GitHub username selected: ${options.username}.`);
      logger.info(`Removing user from organization ${options.org}`);

      const confirmation = await confirmAction({
        action: 'remove',
        platform: 'GitHub',
        force: options.force,
      });

      if (confirmation) {
        await removeGitHubUserFromOrg(options.username, options.org);
      }
    });

  return command;
};

export default githubOffboardCommand();
