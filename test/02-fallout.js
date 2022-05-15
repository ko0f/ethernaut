const { expect } = require("chai");
const { ethers } = require("hardhat");

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
