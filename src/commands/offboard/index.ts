import { Command } from 'commander';
import { onePasswordOffboardCommand } from './1password';
import { clockifyOffboardCommand } from './clockify';
import { githubOffboardCommand } from './github';
import { jiraOffboardCommand } from './jira';

export const offboardCommand = () => {
  const command = new Command();
  command
    .name('offboard')
    .summary('Offboard users on managed platforms')
    .addCommand(jiraOffboardCommand())
    .addCommand(clockifyOffboardCommand())
    .addCommand(githubOffboardCommand())
    .addCommand(onePasswordOffboardCommand());

  return command;
};

export default offboardCommand();
