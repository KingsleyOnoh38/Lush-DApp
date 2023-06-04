import {createContext, useContext} from "react";
import {useAddress, useContract, useContractWrite, useMetamask,} from "@thirdweb-dev/react";
import Swal from "sweetalert2";
import { ethers } from "ethers";

const EstateContext = createContext();

export const EstateContextProvider = ({ children }) => {
    const { contract } = useContract(
        import.meta.env.VITE_THIRDWEB_CONTRACT
        );
    const { mutateAsync: createProperty, isLoading } = useContractWrite(contract, "createProperty")

    const address = useAddress();
    const connect = useMetamask();

    const postProperty = async (title, description, location, price, rooms, bathrooms, sellOrRent, imageHash) => {
        try {
            const data = await createProperty({ args: [
                imageHash, title, description, location, price,
                 rooms, bathrooms, sellOrRent
                ]
            });
            // contract successful..
            console.info("contract call successs", data);
        } catch (err) {
            await Swal.fire('Error!', "An error happened executing your action, try again", 'error')
            console.log(err)
            console.log("contract failed", err);
        }
    };

    const getProperties = async () => {
        const properties = await contract.call("getProperties");
        // console.log(properties)
        // return properties

        return properties.map((property, i) => ({
            id: property.id,
            pId: i,
            owner: property.owner,
            title: property.title,
            sellOrRent: property.sellOrRent, // true=sold, false=rent
            description: property.description,
            price: property.price,
            rooms: property.rooms,
            baths: property.bathrooms,
            image: "https://gateway.pinata.cloud/ipfs/" + property.imageHash,
            soldOn: property.soldOn
        }));
    };

    const getMyProperties = async () => {
        const allProperties = await getProperties();
        return allProperties.filter((property) => property.owner === address);
    }

    const deleteMyProperty = async ({id}) => {
        try {
            // const data = await deleteProperty({ args: [id] });
            const result = await contract.call("deleteProperty", [id])
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }


    return (
        <EstateContext.Provider
            value={{
                address,
                contract,
                connect,
                createProperty : postProperty,
                getProperties,
                getMyProperties,
                deleteMyProperty
            }}
        >
            {children}
        </EstateContext.Provider>
    );
};

export const useEstateContext = () => useContext(EstateContext);
