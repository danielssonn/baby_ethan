import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { TransactionContext } from '../context'
import PropTypes from 'prop-types'
import { CHAIN_MAP } from '../utils/constants'
import detectEthereumProvider from '@metamask/detect-provider'


// ethereum object from window
const { ethereum } = window
// const web3 = createAlchemyWeb3("https://eth-rinkeby.alchemyapi.io/v2/aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I", { writeProvider: provider });

const TransactionProvider = ({ children }) => {
    // states
    const [currentSigner, setCurrentSigner] = useState('')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentChain, setCurrentChain] = useState(1)
    const [ready, setReady] = useState(false)
    const [metamask, isMetamask ] = useState()



    let p;
    if(ethereum){
        p = new ethers.providers.Web3Provider(ethereum)

    } else{
        p = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I")
    }

    const [web3Provider] = useState(p)


    // let [wallet] = useState(new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I"))

    // const [wallet] = useState(new ethers.providers.Web3Provider(ethereum))
    const [isDev, setIsDev] = useState(false)
    const [provider, setProvider] = useState()

    // check if wallet is connect
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return 

            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                setCurrentSigner(web3Provider.getSigner())
            } else {
                // connectWallet()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // connect to user's wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask in Chrome.')
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })

            setCurrentAccount(accounts[0])
            setCurrentSigner(web3Provider.getSigner())
        } catch (error) {
            console.error(error)
        }
    }

    const detectChain = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask in Chrome.')

            const chainId = await ethereum.request({ method: 'eth_chainId' })
            setCurrentChain(Number.parseInt(chainId))
        } catch (error) {
            console.error(error)
        }
    }

    // check if wallet is connected every time page is rerendered
    useEffect(() => {
        checkIfWalletIsConnected().then(() => {
            setReady(true)
        })
    }, [])

    useEffect(() => {
        if (ethereum && currentSigner) {
            ethereum.on('chainChanged', detectChain)

            return () => {
                ethereum.removeListener('chainChanged', detectChain)
            }
        }
    }, [currentSigner])

    useEffect(() => {
        const dev = [2500, 2501].includes(currentChain)
       
        setIsDev(dev)

        if (dev) {
            setProvider(
                new ethers.providers.JsonRpcProvider(
                    CHAIN_MAP.get(currentChain).rpc
                )
            )
        } else {
            /* eslint-disable no-undef */
            setProvider(
                ethers.providers.AlchemyProvider.getWebSocketProvider(
                    currentChain,
                    CHAIN_MAP.get(currentChain).api
                )
            )
            /* eslint-enable no-undef */
        }
    }, [currentChain])

    // TODO: add a nicer loading state
    if (!ready) {
        return <>Loading...</>
    }

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                currentSigner,
                currentChain,
                isDev,
                provider,
                web3Provider,
                
                
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default TransactionProvider
