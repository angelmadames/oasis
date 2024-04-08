<!-- omit in toc -->
# Oasis  ― User Onboarding & Offboarding Automation System

<!-- omit in toc -->
## Content

- [Overview](#overview)
- [Motivation](#motivation)
- [Platforms](#platforms)
  - [Onboarding](#onboarding)
  - [Offboarding](#offboarding)
- [Configuration](#configuration)
- [Commands](#commands)
  - [offboard](#offboard)
  - [onboard](#onboard)

## Overview

Oasis is a CLI tool that runs otasks related to user management
(onboaring/offboarding) in common platforms and services in Software Development.

It's made with [Bun], [Commander.js] and [TypeScript].

## Motivation

At [gbh.tech], the onboarding and offboarding processes require a lot of tasks
and involve multiple areas/departments for them to be completed successfully.
This has led to missed tasks along the way, and only after internal audits
or platform maintenance we notice users that haven't been fully processed.

With the Oasis CLI, we automated a small part of the process: access control.
We ensure users are invited/added to the platform, or removed/deactivated
according to the process being carried out.

At the moment, the Oasis CLI can only be triggered from a local environment,
but we hope to extend it in the future to a more accessible format.

## Platforms

### Onboarding

For Onboarding, the list of supported platforms at the moment is:

- [Jira]

### Offboarding

- [Jira]
- [Clockify]
- [GitHub]
- [1Password]: Uses the CLI, so `op` must be available in your system.

## Configuration

To configure the application access that allows Oasis to offboard or onboard
users, we'll be depending on the `.env` file.

Check the `.env.example` for insights on which values are needed for each
platform. It serves as an starting point to add all the required API keys,
tokens, and URLs.

## Commands

### offboard

As its name indicates, initializes the offboarding of an user in the specified
platform. Offboarding might translate to removal of membership, deactivation of
user, or complete deletion, depending on the context.

> Oasis is not expected to _clearly_ specify the difference by platform, so it
> is up to the operator to review and understand what's happening under the
> hood.

Examples:

```shell
# ./cli onboard jira --user $USER_EMAIL
./cli offboard jira --user devops@gbh.tech

# ./cli onboard clockify --user $USER_EMAIL
./cli offboard clockify --user devops@gbh.tech

# ./cli onboard github --username $GITHUB_USERNAME
./cli offboard github --username devops-gbh-bot
```

### onboard

The onboarding command invites users to the specified platform.

Example:

```shell
# ./cli onboard jira --user $USER_EMAIL
./cli onboard jira --user devops@gbh.tech
```

<!-- References -->
[gbh.tech]: https://gbh.tech
[Bun]: https://bun.sh
[Commander.js]: https://github.com/tj/commander.js
[TypeScript]: https://www.typescriptlang.org
[Jira]: https://www.atlassian.com/software/jira
[Clockify]: https://clockify.me
[GitHub]: https://github.com
[1Password]: https://developer.1password.com
