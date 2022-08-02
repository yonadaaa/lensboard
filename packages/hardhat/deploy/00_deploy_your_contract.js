module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("LensBoard", {
    from: deployer,
    args: [
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
      24984,
    ],
    log: true,
    waitConfirmations: 5,
  });
};
module.exports.tags = ["YourContract"];
