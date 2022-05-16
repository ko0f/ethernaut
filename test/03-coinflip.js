const { expect } = require("chai");
const { ethers } = require("hardhat");

/**
 * Contract formula for pseudo randomness can be easily calculated by
 * a contract with the same code. This is used to anticipate the next 
 * coin "flip" result.
 */

describe("CoinFlip", function () {

    it("guess 10 numbers", async function () {
        [owner, attacker] = await ethers.getSigners();;
        const CoinFlip = await ethers.getContractFactory("CoinFlip");
        const contract = await CoinFlip.deploy();
        await contract.deployed();

        const CoinFlipHack = await ethers.getContractFactory("CoinFlipHack");
        const hack = await CoinFlipHack.deploy();
        await hack.deployed();

        expect(await contract.consecutiveWins()).to.equal(0);

        for (let i = 1; i <= 10; i++) {
            const tx = await hack.flip(contract.address);
            const wins = await contract.consecutiveWins();
            expect(wins.toNumber()).to.equal(i);
            // console.log(`wins = ${wins}`);
        }
    });
});
