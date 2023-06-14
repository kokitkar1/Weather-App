import React, { useEffect, useState } from 'react'
import "./style.css"
import Weather from './weather.js';

const Temp = () => {

    const [searchValue, setSearchValue] = useState("Mumbai");
    const [tempInfo, setTempInfo] = useState({});
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getWeatherInfo = async() =>{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${API_KEY}`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main:weather_mood} = data.weather[0]
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = { temp,humidity,pressure,weather_mood,name,speed,country,sunset }

            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(()=>{
        getWeatherInfo();
       //eslint-disable-next-line
    },[])


  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type='search' placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
            <button className='searchButton' type='button' onClick={getWeatherInfo} >Search</button>
        </div>
    </div>

    <Weather tempInfo={tempInfo}  />
    </> 
  )
}

export default Temp