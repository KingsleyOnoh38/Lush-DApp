// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstate is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    struct Property {
        uint256 id;
        address owner;
        string title;
        string description;
        string imageHash;
        string location;
        uint256 price;
        uint256 rooms;
        uint256 bathrooms;
        bool sellOrRent;
        uint256 createdAt;
        uint256 soldOn;
    }

    mapping (uint256 => Property) private _properties;

    constructor() ERC721("Real Estate Token", "RET") {}

    function createProperty(
        string memory imageHash, string memory title,
        string memory description, string memory location, uint256 price, uint256 rooms, uint256 bathrooms, bool sellOrRent) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        Property memory newProperty = Property(
            newItemId,
            msg.sender,
            title,
            description,
            imageHash,
            location,
            price,
            rooms,
            bathrooms,
            sellOrRent == false ? false : true,
            block.timestamp,
            0
        );

        _properties[newItemId] = newProperty;

        return newItemId;
    }

    function getProperty(uint256 id) public view returns (Property memory) {
        require(_exists(id), "Property does not exist");

        return _properties[id];
    }

    function getProperties() public view returns (Property[] memory) {
        uint256 totalProperties = _tokenIds.current();
        Property[] memory properties = new Property[](totalProperties);

        for (uint256 i = 0; i < totalProperties; i++) {
            properties[i] = _properties[i+1];
        }

        return properties;
    }

    function deleteProperty(uint256 id) public {
        require(_exists(id), "Property does not exist");
        require(_properties[id].owner == msg.sender, "You are not the owner of this property");

        delete _properties[id];
        _burn(id);
    }

    function buyOrRent(uint256 id) public payable {
        require(_exists(id), "Property does not exist");

        if (_properties[id].sellOrRent == true) { // If the property is for sale
            require(msg.value == _properties[id].price, "Incorrect payment amount");
            require(msg.sender != _properties[id].owner, "You are already the owner of this property");

            address payable owner = payable(_properties[id].owner);
            owner.transfer(msg.value); // Transfer the payment to the property owner
            _transfer(_properties[id].owner, msg.sender, id); // Transfer the ownership of the property to the buyer
        } else { // If the property is for rent
            require(_properties[id].soldOn <= block.timestamp, "Property has already been rented or sold");

            // Check if rent is paid on time
            uint256 nextPayment = _properties[id].soldOn + 30 days; // Rent is due every 30 days
            require(msg.value == _properties[id].price && block.timestamp <= nextPayment, "Incorrect payment amount or rent is overdue");

            // Transfer the payment to the property owner
            address payable owner = payable(_properties[id].owner);
            owner.transfer(msg.value);

            // Transfer the ownership of the property to the renter
            _transfer(_properties[id].owner, msg.sender, id);

            // Schedule the next rent payment
            _properties[id].soldOn = nextPayment;
        }
    }

    function dispute(uint256 id) public {
        require(_exists(id), "Property does not exist");
        require(msg.sender == ownerOf(id), "You are not the owner of this property");

        // Transfer ownership of the property back to the original owner
        _transfer(ownerOf(id), _properties[id].owner, id);

        // Reset the rental period
        _properties[id].soldOn = 0;
    }

    function payRent(uint256 id) public payable {
        require(_exists(id), "Property does not exist");
        require(ownerOf(id) == msg.sender, "You are not the renter of this property");

        // Check if rent is paid on time
        uint256 nextPayment = _properties[id].soldOn + 30 days; // Rent is due every 30 days
        require(msg.value == _properties[id].price && block.timestamp <= nextPayment, "Incorrect payment amount or rent is overdue");

        // Transfer the payment to the property owner
        address payable owner = payable(_properties[id].owner);
        owner.transfer(msg.value);

        // Schedule the next rent payment
        _properties[id].soldOn = nextPayment;
    }

    function updateProperty(
        uint256 id, string memory imageHash,
        string memory title, string memory description,
        string memory location, uint256 price,
        uint256 rooms, uint256 bathrooms,
        bool sellOrRent) public {
        require(_exists(id), "Property does not exist");
        require(_properties[id].owner == msg.sender, "You are not the owner of this property");

        _properties[id].imageHash = imageHash;
        _properties[id].title = title;
        _properties[id].description = description;
        _properties[id].location = location;
        _properties[id].price = price;
        _properties[id].rooms = rooms;
        _properties[id].bathrooms = bathrooms;
        _properties[id].sellOrRent = sellOrRent == false ? false : true;
    }

    function getPropertyOwner(uint256 id) public view returns (address) {
        require(_exists(id), "Property does not exist");

        return _properties[id].owner;
    }

    function withdraw() public {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        address payable owner = payable(msg.sender);
        owner.transfer(balance);
    }

}
