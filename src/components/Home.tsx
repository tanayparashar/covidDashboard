import { useEffect, useState,useRef } from "react";
import React, { FC } from 'react';
import { GlobalStats } from "./GlabalStats";
import { CountryTable } from "./CountryTable";
import { StatsData } from "../interfaces/interfaces"
import {Graphs} from "./Graphs"
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";

export const Home:FC=(props)=>
{
    const myRef = useRef<HTMLHeadingElement>();
    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' })
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
                <div>
                    <h1>Hello, React Router!</h1>
                    <Routes>
                    <Route path="./graph" element={<Graphs />} />
                    <Route path="./table" element={<CountryTable summaryData={summaryData} setSummaryData={setSummaryData} />} />
                    </Routes>
                </div>
            <div className="header" style={{display:"block", position:"fixed",top:"0",width:"100%"}}>
                <h3 className="ProjectHeading" style={{ display: "inline", position: "absolute", left: "0", padding: "8px" }}>Covid Dashboard</h3>
                    <a href="./table">Table</a>
                     <a href="./graph">Graphs</a>
                    <a href="./">Home</a>
            </div>
            <GlobalStats NewConfirmed={summaryData?.Global.NewConfirmed} NewRecovered={summaryData?.Global.NewRecovered} NewDeaths={summaryData?.Global.NewDeaths} TotalConfirmed={summaryData?.Global.TotalConfirmed} TotalDeaths={summaryData?.Global.TotalDeaths} TotalRecovered={summaryData?.Global.TotalRecovered}/>
            <Graphs />
            {summaryData ? <CountryTable summaryData={summaryData} setSummaryData={setSummaryData}/>:""}
        </div>
    );
}
export default Home;
