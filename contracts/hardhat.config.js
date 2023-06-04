/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: "goerli",
    networks: {
      hardhat: {},
      goerli: {
        url: process.env.INFURA_GOERLI_ENDPOINT,
        accounts: [process.env.PRIVATE_KEY],
      },
      sepolia: {
        url: process.env.INFURA_SEPOLIA_ENDPOINT,
        accounts: [process.env.PRIVATE_KEY],
      },
      localhost: {},
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
