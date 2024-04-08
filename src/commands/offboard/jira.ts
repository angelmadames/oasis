import { Command } from 'commander';
import confirmAction from '../../utils/confirm-action';
import { deactivateJiraUser, findJiraUserByEmail } from '../../utils/jira';
import logger from '../../utils/logger';
import { sharedOptions } from '../../utils/shared-options';

export const jiraOffboardCommand = () => {
  const command = new Command();
  command
    .name('jira')
    .summary('Offboard users on Jira Cloud')
    .addOption(sharedOptions.user().makeOptionMandatory())
    .addOption(sharedOptions.force())
    .action(async (options) => {
      const user = await findJiraUserByEmail(options.user);

      // Log useful information for operator
      logger.info(`Found Jira user: ${user.emailAddress}.`);
      logger.info(`Account ID for selected user: ${user.accountId}.`);
      logger.info(`Deactiving user ${user.displayName}...`);

      const confirmation = await confirmAction({
        action: 'deactivate',
        platform: 'Jira',
        force: options.force,
      });

      // Proceed with user deactivation if confirmed
      if (confirmation) {
        await deactivateJiraUser(user.accountId);
      }
    });

  return command;
};

export default jiraOffboardCommand();
