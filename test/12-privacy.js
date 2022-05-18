const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Privacy", async () => {

    const password1 = "12345678";
    const password2 = "23456789";
    const password3 = "34567890";

    let owner, attacker, third, contract;

    beforeEach(async () => {
        [owner, attacker, third] = await ethers.getSigners();;

        // const PrivacyEncoder = await ethers.getContractFactory("PrivacyEncoder");
        // const encoderContract = await PrivacyEncoder.deploy();
        // await encoderContract.deployed();
        // const input = await encoderContract.encode();

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
        expect(await contract.locked()).to.be.true;

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