const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("King", async () => {

    it("should win", async function () {
        [owner, attacker, third] = await ethers.getSigners();

        const King = await ethers.getContractFactory("King");
        const contract = await King.deploy({value: "1"});
        await contract.deployed();

        const RoboKing = await ethers.getContractFactory("RoboKing");
        const hack = await RoboKing.connect(attacker).deploy();
        await hack.deployed();

        // console.log(`Prize: ${await contract.prize()}`);

        await third.sendTransaction({to: contract.address, value: "50"});
        expect(await contract._king()).to.equal(third.address);

        // console.log(`Prize: ${await contract.prize()}`);

        await hack.becomeKing(contract.address, {value: "100"});
        expect(await contract._king()).to.equal(hack.address);

        // console.log(`Prize: ${await contract.prize()}`);

        expect(third.sendTransaction({to: contract.address, value: "200"})).to.be.revertedWith("no thanks")
        expect(await contract._king()).to.equal(hack.address);
    });

});