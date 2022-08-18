// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Base64.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

contract BabyNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _totalMinted;

    constructor() ERC721('Baby Nathan', 'BNFT') {}

    function mint(string memory uRI) external onlyOwner nonReentrant {
        _totalMinted.increment();
        uint256 tokenId = _totalMinted.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(_totalMinted.current(), uRI);
    }
    function burn(uint256 tokenId) external onlyOwner nonReentrant{
        _burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
