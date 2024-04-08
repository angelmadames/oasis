export const checkForBinary = (bin: string): boolean => {
  let binExists = false;
  const binStatus = Bun.spawnSync(['which', bin]);

  if (binStatus.success) {
    binExists = true;
    console.log(`Binary for ${bin} found!`);
  } else {
    throw new Error(`Could not find ${bin} in the local system.`);
  }

  return binExists;
};

export default checkForBinary;
