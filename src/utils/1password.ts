import logger from './logger';

export const suspendOnePasswordUser = (user: string) => {
  const command = Bun.spawnSync(['op', 'user', 'suspend', user]);

  if (command.success) {
    logger.info('Suspend command using 1Password CLI succeded.');
  } else {
    logger.error(`Could not suspend user ${user}.`);
    logger.error('Either user is already suspended, or does not exists.');
    throw new Error(command.stderr.toString());
  }

  return command;
};
