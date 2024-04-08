import { Command } from 'commander';
import {
  deactivateClockifyUser,
  findClockifyByEmail,
} from '../../utils/clockify';
import confirmAction from '../../utils/confirm-action';
import logger from '../../utils/logger';
import { sharedOptions } from '../../utils/shared-options';

export const clockifyOffboardCommand = () => {
  const command = new Command();
  command
    .name('clockify')
    .summary('Offboard users on Clockify')
    .addOption(sharedOptions.user().makeOptionMandatory())
    .addOption(sharedOptions.force())
    .action(async (options) => {
      const user = await findClockifyByEmail(options.user);

      // Log useful information for operator
      logger.info(`Found Clockify user: ${user.email}.`);
      logger.info(`User ID for selected user: ${user.id}.`);
      logger.info(`Deactiving user ${user.name}...`);

      const confirmation = await confirmAction({
        action: 'deactivate',
        platform: 'Clockify',
        force: options.force,
      });

      if (confirmation) {
        await deactivateClockifyUser(user.id);
      }
    });

  return command;
};

export default clockifyOffboardCommand();
