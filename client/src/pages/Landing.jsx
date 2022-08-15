import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import useWeb3 from '../hooks/use-web3'
import useContract from '../hooks/use-contract'
import IMAGES from '../../images'
import { LandingFooter } from '../components'

export default function Landing() {
    const { currentAccount, connectWallet } = useWeb3()
    const { diaperFundBalance, addToDiaperFund } = useContract()

    return (
        <>
            <div className="relative bg-gray-50 overflow-hidden">
                <div className="relative pt-6 pb-16 sm:pb-24">
                    <Popover>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <nav
                                className="relative flex items-center justify-between sm:h-10 md:justify-center"
                                aria-label="Global"
                            >
                                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                               
                                        <div className="-mr-2 flex items-center md:hidden">
                            
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                                    <span className="inline-flex rounded-md shadow">
                                        <button
                                            onClick={connectWallet}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
                                        >
                                            Connect wallet
                                        </button>
                                    </span>
                                </div>
                            </nav>
                        </div>
  
                    </Popover>
                </div>
            </div>
            <div> Diaper Fund: {diaperFundBalance} eth</div>
            <div>        
            <input type="number" id="diapers" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="">
                </input>
                <button
                    onClick={addToDiaperFund}
                    className="px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
                >
                    Add
                </button>
            </div>

            <LandingFooter />
        </>
    )
}
