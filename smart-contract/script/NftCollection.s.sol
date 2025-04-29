// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {NftCollection} from "../src/NftCollection.sol";

contract NftCollectionScript is Script {
    function run() external returns (NftCollection) {
        vm.startBroadcast();
        NftCollection nftCollection = new NftCollection();
        vm.stopBroadcast();
        return nftCollection;
    }
}
