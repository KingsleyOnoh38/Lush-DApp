import { useState } from "react";
import {useEstateContext} from "../context/realEstate";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";

export const NewProperty = () => {
    const MySwal = withReactContent(Swal)
    const { address, createProperty } = useEstateContext()
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        location: "",
        price: "",
        rooms: "",
        bathrooms: "",
        sellOrRent: false,
        imageFile: null,
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (event) => {
        setForm((prevState) => ({
            ...prevState,
            imageFile: event.target.files[0],
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // First check if wallet is connected.
        if (!address) return Swal.fire('Wallet not connect!', 'Kindly connect your wallet', 'error')

        //set isLoading to true
        setIsLoading(true);

        const { name, description, location, price, rooms, bathrooms, sellOrRent, imageFile } =
            form;

        try {
            // First handle image, by uploading to pinata and return imageHash..
            const imageHash = await uploadImage(imageFile);

            // Submit to blockchain
            await createProperty(name, description, location, ethers.utils.parseEther(price), rooms, bathrooms, sellOrRent, imageHash);
            await Swal.fire('Successful', 'Estate created successfully!', 'success');
        } catch (error) {
            await Swal.fire('Error!', "An error happened executing your action, try again", 'error')
            console.error(error);
            console.log(error.message)
            alert("Error creating estate: " + error.message);
        }

        // Set isLoading to false after submitting to blockchain
        setIsLoading(false);

        // Clear form values
        // setForm({
        //     name: "",
        //     description: "",
        //     location: "",
        //     price: "",
        //     rooms: "",
        //     bathrooms: "",
        //     sellOrRent: false,
        //     imageFile: null,
        // });

        window.location.reload();
    };

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            body: formData,
            headers: {
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
            },
        });

        const { IpfsHash } = await response.json();
        return IpfsHash;
    };


    return (
        <div className="container mt-5">
            { !address ? <div className="col pb-4 text-center text-danger">Kindly connect your wallet to add property</div>: '' }
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rooms" className="form-label">
                        Number of room(s)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="rooms"
                        name="rooms"
                        value={form.rooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bathrooms" className="form-label">
                        Number of bathroom(s)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="bathrooms"
                        name="bathrooms"
                        value={form.bathrooms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sellOrRent" className="form-label">
                        For Sell or Rent?
                    </label>
                    <select
                        id="sellOrRent"
                        className="form-select"
                        name="sellOrRent"
                        value={form.sellOrRent}
                        onChange={handleChange}
                        required
                    >
                        <option value={false}>Rent</option>
                        <option value={true}>Sell</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary">
                    { isLoading !== true ? 'Create Property': (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </>
                    ) }
                </button>
            </form>
        </div>
    );
}