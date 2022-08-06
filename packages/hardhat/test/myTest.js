const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;
  let lensHub;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("LensBoard", function () {
    it("Should deploy YourContract", async function () {
      const [owner] = await ethers.getSigners();

      const YourContract = await ethers.getContractFactory("LensBoard");
      const LensHub = await ethers.getContractFactory(
        "ERC721PresetMinterPauserAutoId"
      );

      lensHub = await LensHub.deploy("Test", "TEST", "");
      lensHub.mint(owner.address);

      myContract = await YourContract.deploy(
        lensHub.address,
        "0x0000000000000000000000000000000000000000"
      );
    });
  });
});
