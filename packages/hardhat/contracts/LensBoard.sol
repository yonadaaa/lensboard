//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "../lens-protocol/contracts/interfaces/ILensHub.sol";

contract LensBoard is ERC721Holder, Ownable {
    ILensHub public lensHub;
    address public collectModule;

    constructor(ILensHub _lensHub, address _collectModule) {
        lensHub = _lensHub;
        collectModule = _collectModule;
    }

    function post(uint256 profileId, string memory contentURI) public {
        lensHub.post(
            DataTypes.PostData(
                profileId,
                contentURI,
                collectModule,
                abi.encode(true),
                address(0),
                ""
            )
        );
    }

    function transferProfile(address to, uint256 profileId) public onlyOwner {
        lensHub.safeTransferFrom(address(this), to, profileId);
    }
}
