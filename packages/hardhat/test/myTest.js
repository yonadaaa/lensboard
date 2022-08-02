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

    describe("transferProfile()", function () {
      it("Should be able to receive profile NFT's", async function () {
        const [owner] = await ethers.getSigners();

        expect(await lensHub.transferFrom(owner.address, myContract.address, 0))
          .to.emit(lensHub, "Transfer")
          .withArgs(owner.address, myContract.address, 0);
      });

      it("Should not be able to transfer profile out if not owner", async function () {
        const [owner, addr1] = await ethers.getSigners();

        await expect(
          myContract.connect(addr1).transferProfile(owner.address, 0)
        ).to.revertedWith("Ownable: caller is not the owner");
      });

      it("Should be able to transfer profile out", async function () {
        const [owner] = await ethers.getSigners();

        expect(
          await myContract.connect(owner).transferProfile(owner.address, 0)
        )
          .to.emit(lensHub, "Transfer")
          .withArgs(myContract.address, owner.address, 0);
      });
    });
  });
});
