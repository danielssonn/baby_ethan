import { useEffect, useReducer, useState } from 'react'
import { ethers } from 'ethers'

import { ContractContext } from '../context'
import useWeb3 from '../hooks/use-web3'
import { CHAIN_MAP } from '../utils/constants'

import { diaperFundABI } from '../utils/constants'

function getContractFor(chainId, signer) {
   
    const chainConfig = CHAIN_MAP.get(chainId)
    

    const contract  = new ethers.Contract(
        chainConfig.diaperFund,
        diaperFundABI,
        signer || new ethers.providers.JsonRpcProvider(chainConfig.rpc)
    )

    

    return contract;
}

const reducer = (state, action) => {
    return [...state, ...action.data]
}

const ContractProvider = ({ children }) => {
    const { currentAccount, currentChain, currentSigner } = useWeb3()

    const [diaperFundBalance, setDiaperFundBalance] = useState()

    // eslint-disable-next-line
    const fetchDiaperFund = async (chainId) => {
        const chainConfig = CHAIN_MAP.get(chainId)
        console.log('fetch diaper fund for', chainId)

        // Use the contract for the specified chain
        const contract = getContractFor(chainId )

        contract.on("ContributionMade", (from, amount, event) => {
            console.log('deposited! ',amount)
            setDiaperFundBalance(ethers.utils.formatEther(amount))

            
        }) 

        try {
            console.log(chainId)
            const chainName = chainConfig.name
            const diaperFundBalance = await contract.getBalance()
           
            setDiaperFundBalance(ethers.utils.formatEther(diaperFundBalance))
        } catch (e) {
            console.error(
                `Failed to fetch diaper fund for ${chainConfig.name}`,
                e
            )
        }
    }

 

    const addToDiaperFund = async (amount) => {
        if (currentSigner) {
            // TODO: use the mainnet / testnet chain ID
            const contract = getContractFor(4, currentSigner)
            try {
                const  tx = await contract.deposit({ value: ethers.utils.parseEther(amount) })
                
                return tx;
            } catch (e) {
                return e.reason || e.transaction
            }
        }
    }

    useEffect(() => {
        if (currentChain && currentSigner) {
            fetchDiaperFund(currentChain)
        }
    }, [currentChain, currentSigner, ])

    return (
        <ContractContext.Provider
            value={{
                addToDiaperFund,
                diaperFundBalance,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}

export default ContractProvider
