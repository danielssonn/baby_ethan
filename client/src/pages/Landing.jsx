import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import qr from '../../images/qr.png'
import scan from '../../images/checked.svg'

import useWeb3 from '../hooks/use-web3'
import useContract from '../hooks/use-contract'
import IMAGES from '../../images'
import { LandingFooter } from '../components'

export default function Landing() {
    const { currentAccount, connectWallet } = useWeb3()
    const { diaperFundBalance, addToDiaperFund } = useContract()
    const [numberOfDiapers, setNumberOfDiapers] = useState(0)

    return (
        <>
            <div className="relative bg-gray-50 overflow-hidden">
                <div className="relative pt-6 pb-16 sm:pb-24">
                    <Popover>
                        <div>
                            <nav>
                                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <div className="-mr-2 flex items-center md:hidden"></div>
                                    </div>
                                </div>
                                <div className="hdden items-center justify-end inset-y-0 md:right-0">
                                    <span className="inline-flex rounded-md shadow">
                                        <button
                                            onClick={connectWallet}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-stone-600 bg-white hover:bg-gray-50"
                                        >
                                            Connect wallet 
                                        </button>
                                    </span><br></br>
                                   

                                </div>
                            </nav>
                        </div>
                    </Popover>
                </div>
            </div>
            <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                <br></br>
                <h1 className="font-semibold text-2xl text-stone-500 uppercase">
                    {' '}
                    Diaper Fund: {diaperFundBalance} ETH
                </h1>
                <br></br>  

                <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                Would you like to help the baby? 
                </div>

                <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                Connect your wallet, deposit right here:
                </div>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        ETH
                    </span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        id="diapers"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) =>
                            setNumberOfDiapers(event.target.value)
                        }
                    ></input>
                    <button
                        onClick={() => addToDiaperFund(numberOfDiapers)}
                        className="px-5 py-3 text-center font-medium text-stone-600 bg-gray-50 hover:bg-gray-100"
                    >
                        Deposit
                    </button>
                </div>
                <br></br>
                Or send some funds from your wallet:
                <div>
                    <img src={qr} alt="QR" width={80} height={80} />
                </div>
                <div className="font-bold text-stone-600">
                0x9B50B6854c2A963f2C0554798De7812069cC97C3 </div><br></br>
                

                <a href="https://rinkeby.etherscan.io/address/0x9B50B6854c2A963f2C0554798De7812069cC97C3">
                <div className="flex justify-center items-center"><img src={scan} alt="etherscan" width="20" /></div>
                <div>Smart Contract Verified on Etherscan </div>
                </a>
                <br></br>
                <a href="#" onClick={() => {alert('You can still help the baby! Send  e-transfer with "diapers" message  to daniel.maly@gmail.com and we will make the crypto conversion and deposit for you!')}}>Shucks, I only have CADs!</a>
            </div>
            <LandingFooter />
        </>
    )
}
