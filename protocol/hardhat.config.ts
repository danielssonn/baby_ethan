import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import "@nomiclabs/hardhat-web3";
import 'hardhat-deploy'
import 'hardhat-abi-exporter'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const {
  ALCHEMY_API_KEY_KOVAN,
  ALCHEMY_API_KEY_RINKEBY,
  PRIVATE_KEY,
  ETHER_SCAN,
  ALCHEMY_API_KEY_MAINNET,
  ALCHEMY_GOERLI,
  ALCHEMY_API_MUMBAI,
  POLYGON_SCAN
} = process.env

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: '0.8.9' }, { version: '0.6.6' }],
  },
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon_mumbai: {
      url: ALCHEMY_API_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 35000000000
    },
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY_MAINNET}`,
      },
      accounts: {
        accountsBalance: '10000000000000000000000000',
      },
    },
    localhost: {
      chainId: 31337,
    },
  },
  
  namedAccounts: {
    deployer: {
      default: 0,
      // 1: 0,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "8NDFF311UEQNMP9VT1WPS9467ZUXEKXSQ3",

  }
  },
  abiExporter: {
    path: './data/abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    format: 'json'
  },
}

export default config
