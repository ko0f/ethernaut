const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("King", async () => {

    it("should win", async function () {
        [owner, attacker, third] = await ethers.getSigners();;

        const King = await ethers.getContractFactory("King");
        const contract = await King.deploy({value: ethers.utils.parseEther("1")});
        await contract.deployed();

        const prize = await contract.prize();
        console.log(`Prize: ${prize}`);

        const value = ethers.BigNumber.from(2).pow(256).sub(1).toHexString();
        console.log(`value = ${value}`);

        await attacker.sendTransaction({to: contract.address, value });

        const king = await contract._king();

        expect(king).to.equal(attacker.address);
    });

});