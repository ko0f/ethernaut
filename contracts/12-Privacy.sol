// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Privacy {
    //                                           slot  off size
    bool public locked = true;                // 0     0   +1    space wasted because next var is 32 bytes
    uint256 public ID = block.timestamp;      // 1     32  +32
    uint8 private flattening = 10;            // 2     64  +1
    uint8 private denomination = 255;         // 2     65  +1
    uint16 private awkwardness = uint16(now); // 2     66  +2    space wasted
    bytes32[3] private data;                  // 3,4,5 96  +32 +32 +32

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
