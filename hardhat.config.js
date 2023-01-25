require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //   hardhat: {},

    mumbai: {
      // chainId: 80001,
      url: "https://polygon-mumbai.g.alchemy.com/v2/6FHK5jTfRkXdxaEAmPA4RCC45nQ2m_jq",
      // url: process.env.POLYGON_MUMBAI,
      accounts: [
        `0x${"291696c5e3d02238bafd0c7e96e3c3b3a8f83203ce16497f0bc91244cf9454e3"}`,
      ],
    },

    
  },
};
