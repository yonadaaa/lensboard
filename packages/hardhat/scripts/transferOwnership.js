const { execute } = deployments;

const args = process.argv.slice(2);
const to = args[0];

async function main() {
  const { deployer } = await getNamedAccounts();

  await execute(
    "LensBoard",
    { from: deployer, log: true },
    "transferOwnership",
    to
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
