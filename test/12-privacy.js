const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Privacy", async () => {

    const password1 = "12345678";
    const password2 = "23456789";
    const password3 = "34567890";

    let owner, attacker, third, contract;

    beforeEach(async () => {
        [owner, attacker, third] = await ethers.getSigners();;

        const deployEncodedPassword1 = ethers.utils.formatBytes32String(password1);
        const deployEncodedPassword2 = ethers.utils.formatBytes32String(password2);
        const deployEncodedPassword3 = ethers.utils.formatBytes32String(password3);

        const Privacy = await ethers.getContractFactory("Privacy");
        contract = await Privacy.deploy([deployEncodedPassword1, deployEncodedPassword2, deployEncodedPassword3]);
        await contract.deployed();
    });

    it("should unlock with password", async function () {
        expect(await contract.locked()).to.be.true;

        let encodedPassword = ethers.utils.formatBytes32String(password3);
        encodedPassword = encodedPassword.substr(0, 34);
        await contract.unlock(encodedPassword);

        expect(await contract.locked()).to.be.false;
    });

    it("should read the password", async function () {
        // expect(await contract.locked()).to.be.true;

        console.log(`Storage #0: ${await ethers.provider.getStorageAt(contract.address, 0)}`);
        console.log(`Storage #1: ${await ethers.provider.getStorageAt(contract.address, 1)}`);
        console.log(`Storage #2: ${await ethers.provider.getStorageAt(contract.address, 2)}`);
        console.log(`Storage #3: ${await ethers.provider.getStorageAt(contract.address, 3)}`);
        console.log(`Storage #4: ${await ethers.provider.getStorageAt(contract.address, 4)}`);
        console.log(`Storage #5: ${await ethers.provider.getStorageAt(contract.address, 5)}`);

        let encodedPassword = await ethers.provider.getStorageAt(contract.address, 5);

        // web3.utils.hexToAscii
        const decodedPassword = ethers.utils.parseBytes32String(encodedPassword);
        console.log(`Password: ${decodedPassword}`);

        encodedPassword = encodedPassword.substr(0, 34);
        await contract.unlock(encodedPassword);

        expect(await contract.locked()).to.be.false;
    });

    it("should use password from storage visual", async function () {
        expect(await contract.locked()).to.be.true;

        // looking at deployed contract on ganache, these are the last 32 bytes
        let encodedPassword = "0x3334353637383930000000000000000000000000000000000000000000000000";

        // web3.utils.hexToAscii
        const decodedPassword = ethers.utils.parseBytes32String(encodedPassword);
        console.log(`Password: ${decodedPassword}`);

        encodedPassword = encodedPassword.substr(0, 34);
        await contract.unlock(encodedPassword);

        expect(await contract.locked()).to.be.false;
    });

});