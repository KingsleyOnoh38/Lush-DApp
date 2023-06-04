import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import { BigNumber } from 'bignumber.js';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Swal from "sweetalert2";

export const Properties = ({title, properties}) => {
    const { contract } = useContract(
        import.meta.env.VITE_THIRDWEB_CONTRACT
    );
    const { mutateAsync: deleteProperty } = useContractWrite(contract, "deleteProperty")
    const { mutateAsync: buyOrRent } = useContractWrite(contract, "buyOrRent")
    const { state, send } = useContractWrite(contract, "buyOrRent")
    
//   const { deleteMyProperty } = useEstateContext()
    const address = useAddress();
    const navigate = useNavigate();

    // console.log(properties)

    const [isLoading, setIsLoading] = useState(false);

    /* Encode string to slug */
    function toSlug(title) {
        return title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }

    const handleNavigate = (e, property) => {
        e.preventDefault();
        const url = toSlug(property.title);
        navigate(`/property/${url}`, { state: property })
    }

    const handleDelete = async (e, pid) => {
        setIsLoading(true);
        
        // Convert hex to number..
        let id = new BigNumber(pid._hex).toNumber()
        // const data = await deleteMyProperty(id);

        try {
            const data = await deleteProperty({ args: [id] });
            console.info("contract call successs", data);
        } catch (err) {
            await Swal.fire('Error!', "An error happened executing your action, try again", 'error')
            console.error("contract call failure", err);
        }
        // setProperties(data);
        setIsLoading(false);
        await Swal.fire('Deleted', 'Estate deleted successfully!', 'success');
        window.location.reload();
    }

    const handleBuyOrRent = async (e, property) => {
        const propertyId = property.id;
        const price = property.price;
        const priceInWei = ethers.utils.parseUnits(price.toString(), "gwei");
        const priceInNumber = new BigNumber(priceInWei._hex).toNumber().toString()
        console.log(priceInWei);
        console.log(priceInNumber);

        const args = [propertyId];
        const options = {
            value: property.sellOrRent ? ethers.utils.parseEther("1") : 0
        };
        // Buy property
        const tx = await buyOrRent({ args: [propertyId], value: property.sellOrRent ? ethers.utils.parseUnits("1", "gwei") : 0 })
        console.log(tx); // Print transaction info to console
    };

    const handleBuyOrRent2 = async (e, property) => {
        setIsLoading(true);
        const propertyId = property.id;
        const propertyPrice = property.price;
        // console.log(propertyPrice.toNumber().toString())
        // const priceInNumber = new BigNumber(propertyPrice._hex).toNumber().toString()

        // Convert price to wei
        const priceInWei = ethers.utils.parseUnits(propertyPrice.toNumber().toString(), "ether");

        try {
            const data = await buyOrRent({ args: [propertyId] });
            console.info("contract call successs", data);
            await Swal.fire('Successful', 'Property has been bought successfully!', 'success');
            window.location.reload();
        } catch (err) {
            await Swal.fire('Error!', "There's an error executing your action, try again", 'error')
            console.error("contract call failure", err);
        }
        setIsLoading(false);
    }


    // Filter out deleted property..
    const listings = properties?.filter(p => p.owner !== '0x0000000000000000000000000000000000000000').map((property, index) => {
        return (
            <div key={index}>
                <div className="col">
                    <div className="card shadow-sm">
                        <a onClick={() => handleNavigate(property)}>
                            <img width="100%" height="225" src={property.image} alt="picture"/>
                        </a>
                        <div className="card-body">
                            <h3>
                                <Link className="text-capitalize text-decoration-none" onClick={(e) => handleNavigate(e, property)}>
                                    {property.title}
                                </Link>
                            </h3>
                            <p className="card-text">{property.description}</p>
                            <p>
                                Price: { new BigNumber(property.price._hex).toNumber() } ETH
                            </p>
                            <p>
                                Owner: { property.owner }
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" onClick={(e) => handleNavigate(e, property)} 
                                        className="btn btn-sm btn-primary m-1">
                                        Details
                                    </button>
                                    { address !== property.owner ? (
                                        <button type="button" onClick={(e) => handleBuyOrRent(e, property)} 
                                            className="btn btn-sm btn-outline-secondary m-1">
                                            { property.sellOrRent === true ? "Buy" : "Rent" }
                                        </button>
                                    ) : (
                                        <button disabled={isLoading} type="button" onClick={(e) => handleDelete(e, property.id)}
                                        className="btn btn-sm btn-outline-secondary m-1">Delete</button>
                                    ) }
                                </div>
                                <div>
                                    <span className="badge bg-primary">{property.rooms > 1 ? property.rooms + " Rooms": property.rooms + "Room"}</span>
                                    <span className="badge bg-secondary"> {property.baths > 1 ? property.baths + " Baths": property.baths + "Bath"}</span> 
                                    {/* <small className="text-muted">9 mins</small> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
  return <>
      <div className="album py-5 bg-light">
          <div className="container">
              <div className="row text-center pb-5">
                  <h2>{ title }</h2>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  { listings }
              </div>
          </div>
      </div>
  </>
}