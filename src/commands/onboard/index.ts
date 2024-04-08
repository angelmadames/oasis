import { Command } from 'commander';
import { jiraOnboardCommand } from './jira';

export const onboardCommand = () => {
  const command = new Command();
  command
    .name('onboard')
    .summary('Onboard users on managed platforms')
    .addCommand(jiraOnboardCommand());

  return command;
};

export default onboardCommand();
