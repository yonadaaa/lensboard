//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@aave/lens-protocol/contracts/interfaces/ILensHub.sol";

contract LensBoard {
    ILensHub public immutable lensHub;
    address public immutable collectModule;

    event BoardPostCreated(uint256 profileId, uint256 pubId, address poster);

    constructor(ILensHub _lensHub, address _collectModule) {
        lensHub = _lensHub;
        collectModule = _collectModule;
    }

    function post(uint256 profileId, string memory contentURI) public {
        uint256 pubId = lensHub.post(
            DataTypes.PostData(
                profileId,
                contentURI,
                collectModule,
                "",
                address(0),
                ""
            )
        );

        emit BoardPostCreated(profileId, pubId, msg.sender);
    }
}
