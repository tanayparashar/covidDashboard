import {FC, useState} from "react";
import { ICountryData , ITable} from "../interfaces/interfaces";
export const CountryTable:FC<ITable>=(props)=>{
    const {summaryData,setSummaryData}=props;
    const [countryName,setcountyName]=useState("");
    function handleSubmit(e){
        e.preventDefault();
        var obj ={...summaryData};
        obj.Countries = summaryData.Countries.filter((ele: ICountryData) => ele.Country === countryName);
        setSummaryData(obj)
    }
    function handleChange(e){
        setcountyName(e.target.value)
    }
    function onKeyUp(e){
        if(e.keyCode===8)
        {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://api.covid19api.com/summary", requestOptions)
            .then(response => response.json())
            .then(result => { setSummaryData(result); })
            .catch(error => console.log('error', error));
    }
    }
    return(
        <div>
            <div style={{ color: "#373D3F", display: "flex", justifyContent: "center", margin: "50px" }}>
            <form onSubmit={handleSubmit} >
                <label>Enter country:
                    <input
                        type="text"
                        value={countryName}
                        onChange={handleChange}
                        onKeyUp={onKeyUp}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
        <div className="app-container">
            
                {summaryData?.Countries.length>0?
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Total Cases</th>
                            <th>Total Death</th>
                            <th>New Confirmed</th>
                            <th>New Death</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData?.Countries.map((country:ICountryData) => (
                            <tr key={country.ID}>
                                <td>{country.Country}</td>
                                <td>{country.TotalConfirmed}</td>
                                <td>{country.TotalDeaths}</td>
                                <td>{country.NewConfirmed}</td>
                                <td>{country.NewDeaths}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>:"Not Found"
            }
        </div>
        </div>
    );
}