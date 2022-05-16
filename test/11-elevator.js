const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Vulnerable contract sends funds before deducting it, this allows withdrawing 
 * in a loop until balance is depleted.
 */

describe("Elevator", async () => {

    it("should go to top floor", async function () {
        [owner, attacker, third] = await ethers.getSigners();

        const Elevator = await ethers.getContractFactory("Elevator");
        const contract = await Elevator.deploy();
        await contract.deployed();

        const EmpireStateBuilding = await ethers.getContractFactory("EmpireStateBuilding");
        const hack = await EmpireStateBuilding.connect(attacker).deploy(contract.address);
        await hack.deployed();

        // donating the hack contract allows it to initiate a withdraw
        await hack.goTo(10);

        // make sure hack contract has only 100
        expect(await contract.top()).to.be.true;
    });

});