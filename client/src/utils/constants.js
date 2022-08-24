import diaperFund from '../abis/contracts/BabyAccount.sol/BabyAccount.json'



export const diaperFundABI = diaperFund;

export const CHAIN_MAP = new Map([
    [5, {
        name: 'goerli',
        rpc: 'https://eth-goerli.g.alchemy.com/v2/09CuzmY6PuWTweQAzLqHyZrCfoZERWE0',
        diaperFund: '0x584FD9454550477585E8D3E17aD88e61041de010',

    }],
    [4, {
        name: 'rinkeby',
        rpc: 'https://eth-rinkeby.alchemyapi.io/v2/aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I',
        diaperFund: '0x9B50B6854c2A963f2C0554798De7812069cC97C3',

    }],
    // Add Avalanche
    [1, {
        name: 'mainnet',
        rpc: 'https://eth-mainnet.g.alchemy.com/v2/d5nZavCpsYw6_a_fuvohEZW-n0WftBn_',
        diaperFund: '0x1EC7Ff7c85C8131D1992a593Ba05EbF1e8004905',

    }],
    // Local
    [2500,
        {
            name: 'Ganache',
            rpc: 'http://localhost:8545/0',
            diaperFund: '0x987e855776C03A4682639eEb14e65b3089EE6310',

        }


    ],
    [137,
        {
            name: 'Mumbai',
            rpc: 'https://polygon-mumbai.g.alchemy.com/v2/aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I',
            diaperFund: '0xfDE36827403C018E936D8A818e710E020bB11b68',
            api: 'aEGI2NllAAmmX4Ufvw4OTbmBMmPZHn9I'

        }


    ],

])
