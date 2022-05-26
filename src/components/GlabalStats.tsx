import React, { FC } from 'react';
import { GlobalData } from "../interfaces/interfaces"


export const GlobalStats: FC<GlobalData> = (props) => {
    //console.log(props.NewConfirmed);
    return(
        <div>
            <div style={{ marginTop: "50px" }}>
                <h1 style={{ color:"#373D3F"}}>Global Stats</h1>
            </div>
            <div className='globalDataWrapper'> 
                <div className='GlobalDataBox'><h4>New  Cases:{props.NewConfirmed}</h4></div>
                <div className='GlobalDataBox'><h4>Total Cases:{props.TotalConfirmed}</h4></div>
                <div className='GlobalDataBox'><h4>New Deaths:{props.NewDeaths}</h4></div>
                <div className='GlobalDataBox'><h4>Total Deaths:{props.TotalDeaths}</h4></div>            
            </div>
        </div>
        

    );
}
