// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

interface IElevator {
    function floor() external returns (uint256);
    function goTo(uint256 _floor) external;
}

contract EmpireStateBuilding {

    IElevator elevator;

    constructor(IElevator _elevator) public {
        elevator = _elevator;
    }

    function isLastFloor(uint256 floor) external returns (bool) {
        uint256 elevatorFloor = elevator.floor();
        // console.log("elevator's floor %s, going to ", elevatorFloor, floor);
        return elevatorFloor == floor;
    }

    function goTo(uint256 _floor) public {
        elevator.goTo(_floor);
    }
}
