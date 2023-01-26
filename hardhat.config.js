require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.1",
//   networks: {
//       hardhat: {},
//       mumbai: {
//       // chainId: 80001,
//       url: "https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEYS}",
//       // url: process.env.POLYGON_MUMBAI,
//       accounts: [
//         `0x${"291696c5e3d02238bafd0c7e96e3c3b3a8f83203ce16497f0bc91244cf9454e3"}`,
//       ],
//     },
    
//   },
// };

const { task } = require("hardhat/config");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => { const accounts = await hre.ethers.getSigners(); for (const account of accounts) { console.log(account.address); }});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
    mumbai: { 
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, 
      accounts: privateKeys.split(","),
    }, 
  }, 
};

