const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners()
  // console.log(buyer, seller, inspector, lender)
  console.log(buyer.address)
  console.log(seller.address)
  console.log(inspector.address) 
  console.log(lender.address)


  // Deploy Real Estate
  const LushEstate = await ethers.getContractFactory('LushEstate')
  const lushEstate = await LushEstate.deploy()
  await lushEstate.deployed()

  console.log(`Deployed Lush Estate Contract at: ${lushEstate.address}`)
  console.log(`Minting 6 properties...\n`)

  for (let i = 0; i < 6; i++) {
    const transaction = await lushEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQBiHztJi6DyS1Ciyr3zNjjRiLbWmxpbkiY4kdYCCPmbt/${i + 1}.json`)
    await transaction.wait()
  }

  // Deploy Escrow
  const Escrow = await ethers.getContractFactory('Escrow')
  const escrow = await Escrow.deploy(
    lushEstate.address,
    seller.address,
    inspector.address,
    lender.address
  )
  await escrow.deployed()

  console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  console.log(`Listing 6 properties...\n`)

  for (let i = 0; i < 6; i++) {
    // Approve properties...
    let transaction = await lushEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties...
  transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(20), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(4, buyer.address, tokens(15), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(5, buyer.address, tokens(15), tokens(10))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(6, buyer.address, tokens(10), tokens(5))
  await transaction.wait()


  console.log(`Successful.`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

