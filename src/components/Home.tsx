import { useEffect, useState } from "react";
import React, { FC } from 'react';
import { GlobalStats } from "./GlabalStats";
import { CountryTable } from "./CountryTable";
import { StatsData } from "../interfaces/interfaces"
import {Graphs} from "./Graphs"
export const Home:FC=(props)=>
{
    const [summaryData, setSummaryData] = useState <StatsData|null>(null);
    async function reqSummaryData() {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        await fetch("https://api.covid19api.com/summary", requestOptions)
            .then(response => response.json())
            .then(result=>{setSummaryData(result); })
            .catch(error => console.log('error', error));
    }
    useEffect(()=>{
            reqSummaryData();
    },[]);
    return(
        <div>
            <GlobalStats NewConfirmed={summaryData?.Global.NewConfirmed} NewRecovered={summaryData?.Global.NewRecovered} NewDeaths={summaryData?.Global.NewDeaths} TotalConfirmed={summaryData?.Global.TotalConfirmed} TotalDeaths={summaryData?.Global.TotalDeaths} TotalRecovered={summaryData?.Global.TotalRecovered}/>
            <Graphs/>
            {summaryData? <CountryTable summaryData={summaryData} setSummaryData={setSummaryData}/>:""}
        </div>
    );
}
export default Home;
