# Lush_Homes

This Solidity code is a smart contract called "RealEstate" that inherits from the ERC721 contract. It represents a real estate token that allows users to create, manage, buy, and rent properties on the Ethereum blockchain.

Here's a breakdown of the contract's functionality:

Contract Initialization: The contract is initialized with the name "Real Estate Token" and the symbol "RET" for the ERC721 token.

Property Struct: The contract defines a struct called "Property" that represents the details of a property, including its ID, owner, title, description, image hash, location, price, number of rooms and bathrooms, whether it is for sale or rent, creation and sold dates.

Storage: The contract maintains a mapping called _properties that maps property IDs to their corresponding Property struct.

Property Creation: The function createProperty allows users to create a new property by providing its details. The function generates a new property ID, mints a new ERC721 token, and assigns the property to the creator. The property details are stored in the _properties mapping.

Property Retrieval: The function getProperty allows users to retrieve the details of a specific property by providing its ID. The function checks if the property exists and returns its Property struct.

Property Listing: The function getProperties retrieves an array of all the properties created so far. It iterates through the _properties mapping and constructs an array of Property structs.

Property Deletion: The function deleteProperty allows the owner of a property to delete it. The function checks ownership and removes the property from the _properties mapping. It also burns the corresponding ERC721 token.

Buying or Renting a Property: The function buyOrRent enables users to buy or rent a property by providing its ID and the required payment. If the property is for sale, the function verifies the payment amount, transfers the payment to the property owner, and transfers the ownership of the property to the buyer. If the property is for rent, the function checks if the rent payment is made on time and schedules the next rent payment.

Dispute: The function dispute allows the property owner to dispute a rental agreement. It transfers the ownership of the property back to the original owner and resets the rental period.

Paying Rent: The function payRent allows the renter of a property to pay the rent on time. It verifies the payment amount, transfers the payment to the property owner, and schedules the next rent payment.

Property Update: The function updateProperty allows the owner of a property to update its details, such as image hash, title, description, location, price, rooms, bathrooms, and sell or rent status.

Property Owner: The function getPropertyOwner retrieves the owner of a property by providing its ID.

Withdraw: The function withdraw allows the contract owner to withdraw the contract's balance to their account.

The contract extends the functionality provided by the ERC721 contract, which is an Ethereum standard for non-fungible tokens (NFTs). By inheriting from ERC721, the RealEstate contract gains the ability to create unique tokens that represent individual properties, enabling ownership tracking and transferability on the blockchain.




