import { Contract } from '@ethersproject/contracts'
import { expect } from 'chai'
import { ethers, web3 } from 'hardhat'


describe('Baby Account', function () {
    let babyAccount: Contract | undefined

    before(async () => {

        const BabyAccount = await ethers.getContractFactory('BabyAccount')
        babyAccount = await BabyAccount.deploy()
        await babyAccount.deployed()
    })

    it('Should deposit into account', async () => {
    
        await babyAccount!.deposit({value: ethers.utils.parseEther("2.0")});
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("2.0"))
    })
    it('Should withdraw', async () => {
    
        await babyAccount!.withdraw(ethers.utils.parseEther("1.0"));
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("1.0"))
    })
    it('Should not withdraw', async () => {
        const [, addr1] = await ethers.getSigners();
        await expect(babyAccount!.connect(addr1).withdraw(ethers.utils.parseEther("1.0"))).to.be.reverted;
    })

   
})
