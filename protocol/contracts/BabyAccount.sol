
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import "hardhat/console.sol";

contract BabyAccount is Ownable, ReentrancyGuard { 


    // some mapping to manage who sent us monies ....

    mapping (address =>  uint256) babyFriends;

    /**
    * Current custodian can withdraw the funds
     */
    function withdraw(uint256 amount) payable public nonReentrant onlyOwner {
        payable(msg.sender).transfer(amount);
    }

    /**
    * Anyone can deposit funds
    */
    function deposit() public payable {
        babyFriends[msg.sender] =   babyFriends[msg.sender] + msg.value;
    }

    /**
    * Custodian can check account balance
    */
    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    /**
    * Anyone can check their contribution
    */
    function getMyContribution() public view returns (uint256) {

        return babyFriends[msg.sender];
    }


}