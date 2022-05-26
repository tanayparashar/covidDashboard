export interface GlobalData{
    Date?: string;
    NewConfirmed?: number;
    NewDeaths?: number;
    NewRecovered?: number;
    TotalConfirmed?: number;
    TotalDeaths?: number;
    TotalRecovered?: number;
}
export interface StatsData{
    ID: string;
    Message: string;
    Global: GlobalData;
    Countries:any; 
    Date: string;
}
export interface ICountryData{
    ID: string;
    Country: string;
    CountryCode: string;
    Slug:string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
}