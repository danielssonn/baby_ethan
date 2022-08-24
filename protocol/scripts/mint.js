require('dotenv').config({ path: '../.env' })
const API_URL = process.env.ALCHEMY_POLYGON
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY


console.log(API_URL)
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)



const contract = require("../artifacts/contracts/BabyNFT.sol/BabyNFT.json")

const contractAddress = "0x9b3f6c4353A210054c1421dF44bfcEA258BB008a"


const nftContract = new web3.eth.Contract(contract.abi, contractAddress)


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce


    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gasLimit: 500000,
      data: nftContract.methods.mint(tokenURI).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
  }



// Grant QmZCPPGw68wR2ywmD1dMmGMpmnHCJ7kgthwKbF2qaD5hTH
// mintNFT("ipfs://QmZCPPGw68wR2ywmD1dMmGMpmnHCJ7kgthwKbF2qaD5hTH")

// Eshaan QmSXkeuykcMtjYKstNWokaTCaNQfiBspzX5Yw6DT4K2A3N

// mintNFT("ipfs://QmSXkeuykcMtjYKstNWokaTCaNQfiBspzX5Yw6DT4K2A3N")

// Johnson QmX29CBdJsdvrVXdSy3ioygF7M3oc8zYUiHG6wavJoLEVW

// mintNFT("ipfs://QmX29CBdJsdvrVXdSy3ioygF7M3oc8zYUiHG6wavJoLEVW")

// Meelad QmWf4AHwX9N8Tpo2pBGiQBJgTNAw7VxHfB74KeU8KUNbK3

// mintNFT("ipfs://QmWf4AHwX9N8Tpo2pBGiQBJgTNAw7VxHfB74KeU8KUNbK3")

// Daniel QmaoQiS9ZBUgBhtC2N7zztY8aennunxZfwv2LC6RWB99bX

mintNFT("ipfs://Qmbqv1J3o8UDeX2caZxJK9xreqZY3mqGeyzhpYz9sKxM31")
