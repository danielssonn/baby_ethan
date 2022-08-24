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
  POLYGON_SCAN,
  ALCHEMY_API_URL_RINKEBY,
  ALCHEMY_URL_MAINNET,
  ALCHEMY_POLYGON

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
    ethereum: {
      url: ALCHEMY_URL_MAINNET,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    polygon: {
      url: ALCHEMY_POLYGON,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 350000
    },
    rinkeby: {
      url: ALCHEMY_API_URL_RINKEBY,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 35000000000
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
      polygon: "8NDFF311UEQNMP9VT1WPS9467ZUXEKXSQ3",
      rinkeby: "37Z77K4R75KINCQ6175Y7RC8S77RHISCGV",
      mainnet: "37Z77K4R75KINCQ6175Y7RC8S77RHISCGV"
  }
  },
  abiExporter: {
    path: '../client/src/abis/',
    runOnCompile: true,
    spacing: 2,
    format: 'json',
    clear: true
  },
}

export default config
