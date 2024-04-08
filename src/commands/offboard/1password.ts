import { Command } from 'commander';
import { suspendOnePasswordUser } from '../../utils/1password';
import checkForBinary from '../../utils/check-binary';
import confirmAction from '../../utils/confirm-action';
import logger from '../../utils/logger';
import { sharedOptions } from '../../utils/shared-options';

export const onePasswordOffboardCommand = () => {
  const command = new Command();
  command
    .name('1password')
    .summary('Suspend user as member from 1Password organization')
    .addOption(sharedOptions.user().makeOptionMandatory())
    .addOption(sharedOptions.force())
    .action(async (options) => {
      // Check for the existence of the 1Password CLI
      checkForBinary('op');

      // Log useful information for operator
      logger.info(`1Password user selected: ${options.user}.`);
      const account = Bun.spawnSync(['op', 'account', 'get']);
      logger.info('1Password current account information:');
      logger.info(account.stdout.toString());

      // Evaluate confirmation for user deactivation
      const confirmation = await confirmAction({
        action: 'suspend',
        platform: '1Password',
        force: options.force,
      });

      // Proceed with user deactivation if confirmed
      if (confirmation) {
        suspendOnePasswordUser(options.user);
      }
    });

  return command;
};

export default onePasswordOffboardCommand();
