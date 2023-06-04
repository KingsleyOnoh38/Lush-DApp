import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import {useEstateContext} from "./context/realEstate";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Home} from "./pages/Home";
import {Properties} from "./pages/Properties";
import {PropertyDetails} from "./pages/PropertyDetails";
import {NewProperty} from "./pages/NewProperty";
// import "./styles/Home.css";

export default function App() {
  const {address, contract, getProperties, getMyProperties} = useEstateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]);

  const loadProperties = async () => {
    setIsLoading(true);
    const data = await getProperties();
    setProperties(data);
    setIsLoading(false);
  }

    const loadMyProperties = async () => {
    setIsLoading(true);
    const data = await getMyProperties();
    setMyProperties(data);
    setIsLoading(false);
  }
  
  // personal property
  // setMyPropery(properties.filter((property) => property.owner === address))

  useEffect(() => {
    if(contract) loadProperties();
  }, [address, contract]);

  useEffect(() => {
    if(contract) loadMyProperties();
  }, [address, contract]);

  return <>
    <Header />
    <main>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-property" element={<NewProperty />} />
        <Route path="/properties" element={<Properties title="All Properties" properties={properties} />} />
        <Route path="/property/:title" element={<PropertyDetails properties={properties} address={address} />} />
        <Route path="/my-properties" element={<Properties title="My Properties" properties={myProperties} address={address} />} />
      </Routes>

    </main>
    <Footer />
  </>
}
