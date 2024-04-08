import { Option } from 'commander';

export const sharedOptions = {
  user(): Option {
    return new Option(
      '-u, --user <user>',
      'User [email] to initialize offboarding',
    );
  },
  username(): Option {
    return new Option(
      '-u, --username <user>',
      'User [username] to initialize offboarding',
    );
  },
  force(): Option {
    return new Option(
      '-f, --force',
      'Force user offboarding by avoiding operator interactivity',
    ).default(false);
  },
};
