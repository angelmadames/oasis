import { confirm } from '@inquirer/prompts';
import { Command } from 'commander';
import {
  activateJiraUser,
  findJiraUserByEmail,
  inviteJiraUser,
} from '../../utils/jira';
import logger from '../../utils/logger';

export const jiraOnboardCommand = () => {
  const command = new Command();
  command
    .name('jira')
    .summary('Onboard users on Jira Cloud')
    .requiredOption(
      '-u, --user <user>',
      'User [email] to initialize offboarding',
    )
    .option('-r, --reactivate', 'Re-enable deactivated user', false)
    .action(async (options) => {
      if (options.reactivate) {
        const user = await findJiraUserByEmail(options.user);
        logger.info(`Found Jira user: ${user.emailAddress}.`);
        logger.info(`Account ID for selected user: ${user.accountId}.`);
        logger.info(`Activating user ${user.displayName}...`);
        const confirmActivation = await confirm({
          message: `Activate user '${user.emailAddress}' in Jira?`,
        });
        if (confirmActivation) {
          await activateJiraUser(user.accountId);
          logger.info('Activation completed!');
        } else {
          logger.info('Activation cancelled.');
        }
      } else {
        await inviteJiraUser(options.user);
        logger.info(`User '${options.user}' invited successfully.`);
      }
    });

  return command;
};

export default jiraOnboardCommand();
