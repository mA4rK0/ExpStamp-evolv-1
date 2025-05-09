// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftCollection is ERC721 {
    event NftMinted(address indexed minter, uint256 indexed tokenId, string tokenUri);

    uint256 private s_tokenCounter;
    mapping(uint256 => string) private s_tokenIdToUri;
    mapping(address => uint256[]) private s_ownerToTokens;

    constructor() ERC721("ExpStamp", "EXPS") {
        s_tokenCounter = 0;
    }

    function mintNft(string calldata tokenUri) external {
        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
        s_ownerToTokens[msg.sender].push(s_tokenCounter);
        emit NftMinted(msg.sender, s_tokenCounter, tokenUri);
        unchecked {
            s_tokenCounter++;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return s_tokenIdToUri[tokenId];
    }

    function getUserTokenUris(address user) external view returns (string[] memory) {
        uint256[] memory tokenIds = s_ownerToTokens[user];
        string[] memory uris = new string[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uris[i] = s_tokenIdToUri[tokenIds[i]];
        }

        return uris;
    }
}
