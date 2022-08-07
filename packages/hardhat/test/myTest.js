const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let lensBoard;
  let lensHub;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("LensBoard", function () {
    it("Should deploy YourContract", async function () {
      const [owner] = await ethers.getSigners();

      const LensHub = await ethers.getContractFactory(
        "ERC721PresetMinterPauserAutoId"
      );
      const LensBoard = await ethers.getContractFactory("LensBoard");
      const Paymaster = await ethers.getContractFactory(
        "SingleRecipientPaymaster"
      );

      lensHub = await LensHub.deploy("Test", "TEST", "");
      lensHub.mint(owner.address);

      lensBoard = await LensBoard.deploy(
        lensHub.address,
        "0x0000000000000000000000000000000000000000"
      );

      const payMaster = await Paymaster.deploy(lensBoard.address);
    });
  });
});
