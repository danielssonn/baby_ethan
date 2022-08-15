import diaperFund from '../abis/contracts/BabyAccount.sol/BabyAccount.json'



export const diaperFundABI = diaperFund;

export const CHAIN_MAP = new Map([
    [5, {
        name: 'goerli',
        rpc: 'https://eth-goerli.g.alchemy.com/v2/09CuzmY6PuWTweQAzLqHyZrCfoZERWE0',
        diaperFund: '0x584FD9454550477585E8D3E17aD88e61041de010',

    }],
    // Add Avalanche
    [1, { name: 'ethereum' }],
    // Local
    [2500,
        {
            name: 'Ganache',
            rpc: 'http://localhost:8545/0',
            diaperFund: '0x987e855776C03A4682639eEb14e65b3089EE6310',

        }


    ],

])
