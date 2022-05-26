import { FC, useEffect, useState} from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Graphs:FC<any>=()=>{
    const [country,setCountry]=useState("japan");
    const [startDate, setStartDate] = useState("2022-04-15");
    const [countryList, setCountryList] = useState <{}[]>([{}]);
    const [chartData,setChartData]=useState <{}[]>();
    
    
    async function requestCountries()
    {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };
        const res = await fetch("https://api.covid19api.com/countries", requestOptions);
        const json = await res.json();
        setCountryList(json);
       
        var res1 = await fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${startDate}T00:00:00ZZ`, requestOptions);
        var json1 = await res1.json();
        json1=json1.filter((ele,i)=>{if(i===0) return 1;
            else{
                if(ele.Date===json1[i-1].Date)
                {
                    return 0;
                }
                else{
                    return 1;
                }
            } 
        })
        setChartData(json1);
        
    }
    async function handleSubmit(e){
        e.preventDefault();
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };

        var res1 = await fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${startDate}T00:00:00ZZ`, requestOptions);
        var json1 = await res1.json();
        json1 = json1.filter((ele, i) => {
            if (i === 0) return 1;
            else {
                if (ele.Date === json1[i - 1].Date) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
        })
        setChartData(json1);
    }
    useEffect(()=>{
        requestCountries();
    },[])
   
    return (
        <div>
            <h2 style={{ color: "#373D3F",display: "flex", justifyContent: "center",margin:"50px"}}>Graphs of Cases in Country After a Given Date</h2>
            <div className="graphPage">
            <div >
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
            </div>
            <div style={{ height: "500px", display: "flex", justifyContent:"center"}} >
            <ResponsiveContainer width={'96%'} height={500}>
                <AreaChart
                    width={500}
                    height={400}
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Confirmed" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="Active" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="Deaths" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
            {/* {chartData?<ChartContainer/>:""} */}
        </div>
    ); 
}