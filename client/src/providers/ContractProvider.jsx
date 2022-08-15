import { useEffect, useReducer, useState } from 'react'
import { ethers } from 'ethers'

import { ContractContext } from '../context'
import useWeb3 from '../hooks/use-web3'
import { CHAIN_MAP } from '../utils/constants'

import { diaperFundABI } from '../utils/constants'

function getContractFor(chainId, signer) {
    console.log('for ', chainId)
    const chainConfig = CHAIN_MAP.get(chainId)
    return new ethers.Contract(
        chainConfig.diaperFund,
        diaperFundABI,
        signer || new ethers.providers.JsonRpcProvider(chainConfig.rpc)
    )
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
        console.log('fetch for', chainId)

        // Use the contract for the specified chain
        const contract = getContractFor(chainId, currentSigner)
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
            const contract = getContractFor(2500, currentSigner)
            try {
                await contract.deposit({ value: ethers.utils.parseEther("1.0") })
                
                
                fetchDiaperFund(currentChain)   
                return receipt;
            } catch (e) {
                return e.reason || e.transaction
            }
        }
    }

    useEffect(() => {
        if (currentChain && currentSigner) {
            fetchDiaperFund(currentChain)
        }
    }, [currentChain, currentSigner])

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
