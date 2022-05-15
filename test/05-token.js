const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {

    it("transfers tokens", async function () {
        [owner, attacker, third] = await ethers.getSigners();;
        const Token = await ethers.getContractFactory("Token");
        const contract = await Token.deploy(10000000);
        await contract.deployed();

        expect(await contract.balanceOf(owner.address)).to.equal(await contract.totalSupply());
        expect(await contract.balanceOf(attacker.address)).to.equal(0);
        expect(await contract.balanceOf(third.address)).to.equal(0);

        await contract.connect(attacker).transfer(third.address, 1);

        const attackerBalance = await contract.balanceOf(attacker.address);
        expect(attackerBalance.gt(0)).to.be.true;

        const thirdBalance = await contract.balanceOf(third.address);
        expect(thirdBalance.gt(0)).to.be.true;

    });
});
