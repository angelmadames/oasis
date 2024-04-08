#!/usr/bin/env bun

import { Command } from 'commander';
import { offboardCommand } from './src/commands/offboard';
import { onboardCommand } from './src/commands/onboard';

const cli = new Command();

cli
  .name('hades')
  .description('Hades CLI')
  .addCommand(offboardCommand())
  .addCommand(onboardCommand())
  .version('0.0.1')

cli.parse();
