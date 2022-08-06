//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@aave/lens-protocol/contracts/interfaces/ILensHub.sol";

contract LensBoard {
    ILensHub public lensHub;
    address public collectModule;
    bytes private constant collectModuleInitData = abi.encode(true);

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
                collectModuleInitData,
                address(0),
                ""
            )
        );
    }
}
