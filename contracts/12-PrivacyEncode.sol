// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PrivacyEncoder {

    function encode() public pure returns (bytes32[3] memory b32Arr) {
        return [bytes32("12345678"), bytes32("23456789"), bytes32("34567890")];
    }
}
