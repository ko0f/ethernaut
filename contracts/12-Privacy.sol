// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Privacy {
    bool public locked = true;                // 0  +1
    uint256 public ID = block.timestamp;      // 1  +8
    uint8 private flattening = 10;            // 9  +1
    uint8 private denomination = 255;         // 10 +1
    uint16 private awkwardness = uint16(now); // 11 +2 
    bytes32[3] private data;                  // 12 +32 +32

    constructor(bytes32[3] memory _data) public {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
