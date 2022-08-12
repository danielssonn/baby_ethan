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

    it('Owner Should deposit into account', async () => {
    
        await babyAccount!.deposit({value: ethers.utils.parseEther("2.0")});
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("2.0"))
    })
    it('Owner Should withdraw', async () => {
    
        await babyAccount!.withdraw(ethers.utils.parseEther("1.0"));
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("1.0"))
    })

    it('Others should deposit into account', async () => {
        const [, addr1] = await ethers.getSigners();

        await babyAccount!.connect(addr1).deposit({value: ethers.utils.parseEther("1.0")});
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("2.0"))
    })
    it('Others should not not withdraw', async () => {
        const [, addr1] = await ethers.getSigners();

        await expect(babyAccount!.connect(addr1).withdraw(ethers.utils.parseEther("1.0"))).to.be.reverted;
    })
    it('Anyone should see their contribution', async () => {
        const [, addr1] = await ethers.getSigners();

        expect(await babyAccount!.connect(addr1).getMyContribution()).to.be.equal(ethers.utils.parseEther("1.0"))
    })
    it('Others should deposit into account again', async () => {
        const [, addr1] = await ethers.getSigners();

        await babyAccount!.connect(addr1).deposit({value: ethers.utils.parseEther("1.0")});
        expect(await babyAccount!.getBalance()).to.be.equal(ethers.utils.parseEther("3.0"))
    })
    it('Anyone should see their second contribution', async () => {
        const [, addr1] = await ethers.getSigners();

        expect(await babyAccount!.connect(addr1).getMyContribution()).to.be.equal(ethers.utils.parseEther("2.0"))
    })

   
})
