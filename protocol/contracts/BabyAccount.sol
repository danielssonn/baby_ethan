
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import "hardhat/console.sol";

contract BabyAccount is Ownable, ReentrancyGuard { 


    // some mapping to manage who sent us monies ....

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

    }

    /**
    * Custodian can check account balance
    */
    function getBalance() public view onlyOwner returns (uint256) {
        console.log(address(this).balance);
        return address(this).balance;
    }


}