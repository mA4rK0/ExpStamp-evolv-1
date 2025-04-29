// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {NftCollectionScript} from "../script/NftCollection.s.sol";
import {NftCollection} from "../src/NftCollection.sol";

contract NftCollectionTest is Test {
    NftCollectionScript public script;
    NftCollection public nftCollection;

    function setUp() public {
        script = new NftCollectionScript();
        nftCollection = script.run();
    }

    function testNameIsCorrect() public view {
        string memory name = "ExpStamp";
        string memory actualName = nftCollection.name();
        assert(keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(actualName)));
    }
}
