const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", async () => {

    it("should read the password", async function () {
        [owner, attacker, third] = await ethers.getSigners();;

        const password = "12345678";
        const deployEncodedPassword = ethers.utils.formatBytes32String(password);

        const Vault = await ethers.getContractFactory("Vault");
        const contract = await Vault.deploy(deployEncodedPassword);
        await contract.deployed();

        const encodedPassword = await ethers.provider.getStorageAt(contract.address, 1);

        // web3.utils.hexToAscii
        const decodedPassword = ethers.utils.parseBytes32String(encodedPassword);
        console.log(`Password: ${decodedPassword}`);
        expect(decodedPassword).to.equal(password);
    });

});