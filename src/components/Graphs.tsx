import { FC, useEffect, useState, memo } from "react";
import Paper from '@mui/material/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { styled } from '@mui/material/styles';
import { scalePoint } from 'd3-scale';

export const Graphs:FC<any>=()=>{
    const [country,setCountry]=useState("south-africa");
    const [countryList, setCountryList] = useState <{}[]>([{}]);
    const [chartData,setChartData]=useState <{}[]>();
    const [startDate,setStartDate]=useState("2022-01-01");
    async function requestCountries()
    {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        const res = await fetch("https://api.covid19api.com/countries", requestOptions);
        const json = await res.json();
        setCountryList(json);

       
        fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${startDate}T00:00:00ZZ`, requestOptions)
            .then(response => response.json())
            .then(result => setChartData(result))
            .catch(error => console.log('error', error));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${startDate}T00:00:00Z`, requestOptions)
        .then(response => response.json())
            .then(result => setChartData(result))
            .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        requestCountries();
    },[])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="location">
                    Location
                <select value={country} onChange={(e) => setCountry(e.target.value)} onBlur={(e) => setCountry(e.target.value)}>
                    <option />
                    {countryList.map((ele:any) => (
                        <option key={ele.Slug} value={ele.Slug}>
                            {ele.Country}
                        </option>
                    ))}
                </select>
                </label>
                <label className="form-info" htmlFor="EndTime">
                    Start Time
                    <input
                        type="date"
                        value={startDate}
                        placeholder="End Time"
                        onChange={(ev) =>setStartDate(ev.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}