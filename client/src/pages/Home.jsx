import {useEffect, useState} from "react";
import {ConnectWallet} from "@thirdweb-dev/react";
import {useEstateContext} from "../context/realEstate";
import {Properties} from "./Properties";

export const Home = () => {
  const { address, contract, getProperties } = useEstateContext();
    const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    setIsLoading(true);
    const data = await getProperties();
    setProperties(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) loadProperties();
  }, [address, contract]);

  return <>
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Lush Estate</h1>
          <p className="lead text-muted">Buy and Sell Properties</p>
          <p>
            {/*<ConnectWallet dropdownPosition={{*/}
            {/*  align: 'center',*/}
            {/*  side: 'bottom'*/}
            {/*}} />*/}
            <a href="#" className="btn btn-primary my-2">Get Started</a>
          </p>
        </div>
      </div>
    </section>
    <Properties title="Recent Properties" properties={properties} />
  </>
}