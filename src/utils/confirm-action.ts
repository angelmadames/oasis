import { confirm } from '@inquirer/prompts';
import type { OffboardAction } from './shared-types';
import type { SupportedPlatforms } from './shared-types';
import { capitalize } from './string';

interface ActionConfirmation {
  message?: string;
  action: OffboardAction;
  platform: SupportedPlatforms;
  force?: boolean;
}

export const confirmAction = async ({
  message,
  action,
  platform,
  force,
}: ActionConfirmation) => {
  // Construct the mssage
  const confirmationMessage =
    message ?? `${capitalize(action)} user from paltform ${platform}?`;

  // Evaluate confirmation for user deactivation
  let confirmation = force;
  if (!confirmation) {
    confirmation = await confirm({
      message: confirmationMessage,
    });
  }

  return confirmation;
};

export default confirmAction;
