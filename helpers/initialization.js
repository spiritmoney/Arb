require("dotenv").config();
const config = require('../config.json')
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require('web3')
let web3

if (!config.PROJECT_SETTINGS.isDeployed) {
    const provider = new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    })

    web3 = new Web3(provider)
} else {
    web3 = new Web3('ws://127.0.0.1:7545')
}

const IUniswapV2Router02 = require('../artifacts/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol/IUniswapV2Router02.json')
const IUniswapV2Factory = require("../artifacts/@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol/IUniswapV2Factory.json")

const uFactory = new web3.eth.Contract(IUniswapV2Factory.abi, config.UNISWAP.FACTORY_ADDRESS) // UNISWAP FACTORY CONTRACT
const uRouter = new web3.eth.Contract(IUniswapV2Router02.abi, config.UNISWAP.V2_ROUTER_02_ADDRESS) // UNISWAP ROUTER CONTRACT
const sFactory = new web3.eth.Contract(IUniswapV2Factory.abi, config.PANCAKESWAP.FACTORY_ADDRESS) // SUSHISWAP FACTORY CONTRACT
const sRouter = new web3.eth.Contract(IUniswapV2Router02.abi, config.PANCAKESWAP.V2_ROUTER_02_ADDRESS) // SUSHISWAP ROUTER CONTRACT

const IArbitrage = require('../artifacts/contracts/Arbitrage.sol/Arbitrage.json')
const arbitrage = new web3.eth.Contract(IArbitrage.abi, process.env.ARB_CONTRACT_ADDRESS);

module.exports = {
    uFactory,
    uRouter,
    sFactory,
    sRouter,
    web3,
    arbitrage
}