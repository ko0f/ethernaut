const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Force", async () => {

    it("should send eth to contract", async function () {
        [owner, attacker, third] = await ethers.getSigners();;

        const Force = await ethers.getContractFactory("Force");
        const contract = await Force.deploy();
        await contract.deployed();

        const ForceHack = await ethers.getContractFactory("ForceHack");
        const hack = await ForceHack.connect(attacker).deploy();
        await hack.deployed();
        
        const hackTx = await hack.connect(attacker).send(contract.address, {value: 1000});
        const hackReceipt = await hackTx.wait();

        const hackBalance = await ethers.provider.getBalance(hack.address);
        // console.log(`Hack contract balance: ${+hackBalance}`);

        const balance = await ethers.provider.getBalance(contract.address);
        // console.log(`Contract balance: ${+balance}`);
        expect(+balance).to.greaterThan(0);
    });

});