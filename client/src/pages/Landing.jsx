import { Link, useNavigate } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import qr from '../../images/qr.png'
import scan from '../../images/checked.svg'
import bg from '../../images/9.png'

import useWeb3 from '../hooks/use-web3'
import useContract from '../hooks/use-contract'
import { LandingFooter } from '../components'
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from '@material-tailwind/react'

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
                id === open ? 'rotate-180' : ''
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    )
}

export default function Landing() {
    const { currentAccount, connectWallet, isMetamask } = useWeb3()
    const { diaperFundBalance, addToDiaperFund } = useContract()
    const [numberOfDiapers, setNumberOfDiapers] = useState(0)

    const [open, setOpen] = useState(0)

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value)
    }

    return (
        <>
            <div className="bg-dashboard  w-full h-100v flex flex-col justify-center items-center">
                <br></br>
                Crypto fund for a baby. Why did we make it?<br></br>
                <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                    It beats a gift basket, anyday!
                </div>
                <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                    It will grow with the baby.
                </div>
                <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => alert('This crypto fund is a smart contract, deployed on Ethereum. Anyone can contribute ETH to it. The fund owner - baby parent can withdraw the funds anytime. \r\n \r\n It is like the old school envelope with cash, only better. Birthdays, graduations - any event is good for contribution. The best thing - the value will grow over time!')}
                >
                    How does this work?
                </button>
  
                <br></br>
                <h1 className="font-semibold text-3xl text-rose-900	 uppercase">
                    Balance: {diaperFundBalance} ETH
                </h1>
                <a href="https://rinkeby.etherscan.io/address/0x9B50B6854c2A963f2C0554798De7812069cC97C3">
                    <div className="flex justify-center items-center">
                        <img src={scan} alt="etherscan" width="20" />
                    </div>
                    <div className="flex justify-center items-center">
                        Verified on Etherscan{' '}
                    </div>
                    <div className="font-bold text-stone-600 underline">
                        0x9B50B6854c2A963f2C0554798De7812069cC97C3
                    </div>
                </a>
                <div>Fund owner: Baby Daddy Rui</div>
 
                <br></br> <br></br>
                <hr></hr>
                <div>
                    <div className="bg-red-500 justify-left items-left text-white min-w-full">
                        How can I contribute?
                    </div>
                    <Fragment>
                        <Accordion
                            open={open === 1}
                            className="bg-orange-200 min-w-full"
                        >
                            <AccordionHeader onClick={() => handleOpen(1)}>
                                A. Ahh, Shucks. I only have CADs
                            </AccordionHeader>
                            <AccordionBody>
                                <ol>
                                    <li>
                                        1. Send e-transfer to
                                        daniel.maly@gmail.com
                                    </li>
                                    <li>
                                        2. Put 'diaper fund' in the transfer
                                        message
                                    </li>
                                    <li>2. We'll exchange it for crypto</li>
                                    <li>
                                        3. We'll send it to the Diaper Fund, for
                                        you
                                    </li>
                                    <li>4. And send you a receipt</li>
                                </ol>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2} className="bg-orange-300">
                            <AccordionHeader onClick={() => handleOpen(2)}>
                                B. I have my mobile crypto wallet
                            </AccordionHeader>
                            <AccordionBody>
                                <div className="bg-dashboard bg-contain bg-repeat-x w-full h-100v flex flex-col justify-center items-center">
                                    <ol>
                                        <li>
                                            1. Launch your mobile wallet, such
                                            as Metamask &nbsp;
                                        </li>
                                        <li>
                                            2. Select 'Send' and scan the code
                                            below
                                        </li>
                                        <li>
                                            3. Select the amount - just a little
                                            bit!
                                        </li>
                                        <li>
                                            4. See the Diaper Fund balance
                                            update
                                        </li>
                                    </ol>
                                    <br></br>
                                    <div>
                                        <img
                                            src={qr}
                                            alt="QR"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="font-bold text-stone-600">
                                        0x9B50B6854c2A963f2C0554798De7812069cC97C3{' '}
                                    </div>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3}>
                            <AccordionHeader
                                onClick={() => handleOpen(3)}
                                className="bg-orange-400"
                            >
                                C. I'm a crypto cowboy!
                            </AccordionHeader>
                            <AccordionBody className="bg-orange-400">
                                <ol>
                                    <li>1. This is my personal computer</li>
                                    <li>2. I am using Chrome browser</li>
                                    <li>
                                        3. My Metamask extension is ready to go!
                                    </li>
                                </ol>
                                <br></br>
                                <div className="hdden items-center justify-start inset-y-0 md:left-0">
                                    <span className="inline-flex rounded-md shadow ">
                                        <button
                                            onClick={connectWallet}
                                            className="inline-flex bg-orange-600 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-white hover:text-black"
                                        >
                                            Connect!
                                        </button>
                                    </span>
                                    <br></br>
                                </div>
                                <div className="flex">
                                    <span className="inline-flex bg-orange-600 items-center px-3 text-sm text-white  rounded-l-md border border-r-0  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        ETH
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        id="diapers"
                                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(event) =>
                                            setNumberOfDiapers(
                                                event.target.value
                                            )
                                        }
                                    ></input>
                                    <button
                                        onClick={() =>
                                            addToDiaperFund(numberOfDiapers)
                                        }
                                        className="px-5 py-3 bg-orange-600  text-center font-medium text-white hover:text-black"
                                    >
                                        Deposit
                                    </button>
                                </div>
                            </AccordionBody>
                        </Accordion>
                    </Fragment>
                </div>
            </div>

            <LandingFooter />
        </>
    )
}
