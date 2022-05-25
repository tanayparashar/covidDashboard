import React, { FC } from 'react';
import { GlobalData } from "../interfaces/interfaces"


export const GlobalStats: FC<GlobalData> = (props) => {
    //console.log(props.NewConfirmed);
    return(
        <div>
            <h1>{props.NewConfirmed}</h1>
            <h1>{props.TotalConfirmed}</h1>
        </div>
        

    );
}
