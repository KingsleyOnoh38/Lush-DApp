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
  console.log(`Minting 12 properties...\n`)

  for (let i = 0; i < 12; i++) {
    const transaction = await lushEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmfPjWLJo5CihJwDSANN5tzzhjccCwetDvmxzaqDfBcnLE/${i + 1}.json`)
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
  console.log(`Listing 12 properties...\n`)

  for (let i = 0; i < 12; i++) {
    // Approve properties...
    let transaction = await lushEstate.connect(seller).approve(escrow.address, i + 1)
    await transaction.wait()
  }

  // Listing properties...
  transaction = await escrow.connect(seller).list(1, buyer.address, tokens(0.02), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(0.02), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(0.15), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(4, buyer.address, tokens(0.02), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(5, buyer.address, tokens(0.04), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(6, buyer.address, tokens(0.02), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(7, buyer.address, tokens(0.012), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(8, buyer.address, tokens(0.03), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(9, buyer.address, tokens(0.04), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(10, buyer.address, tokens(0.03), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(11, buyer.address, tokens(0.025), tokens(0.005))
  await transaction.wait()

  transaction = await escrow.connect(seller).list(12, buyer.address, tokens(0.02), tokens(0.005))
  await transaction.wait()


  
  console.log(`Successful.`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

