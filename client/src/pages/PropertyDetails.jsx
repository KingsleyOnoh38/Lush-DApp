import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BigNumber } from 'bignumber.js';

export const PropertyDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return <>
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row text-center pb-5">
                    <h2 className="text-capitalize">{ state.title }</h2>
                    <img width="100%" height="400" src={state.image} alt="state.title" />
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col col-10">
                        { state.description}
                    </div>
                    <div className="col col-10">
                        Rooms: { new BigNumber(state.rooms._hex).toNumber() }
                    </div>
                    <div className="col col-10">
                        Bathrooms: { new BigNumber(state.baths._hex).toNumber() }
                    </div>
                </div>
            </div>
        </div>
    </>
}