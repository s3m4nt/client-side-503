import { Nav, Navbar } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'
import logoMain from '../resources/images/Logo.png'
import { WiStrongWind } from 'weather-icons-react'
import { useState, useEffect } from 'react'
import React from 'react'
import '../App.css'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export default function Navigation(props) {
    
  // weather function, include city, weather state, icon, degrees F
  const [weather, setWeather] = useState(null)
    
  // create random city

  const city = [
    {
        parkCity: 'sitka',
        parkType: 'Sitka National Historical Park'
    },
    {
        parkCity: 'kalaupapa',
        parkType: 'Kalaupapa National Historical Park'
    },
    {
        parkCity: 'jensen',
        parkType: 'Dinosaur National Monument'
    },
    {
        parkCity: 'patchogue',
        parkType: 'Fire Island National Park'
    }
  ]
  
  let random = Math.floor(Math.random() * city.length)
  let parkNameRan = city[random].parkCity

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${parkNameRan}&units=imperial&APPID=${API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      // setQuery('');
      console.log(result);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

const Weather = () => {
  // console.log(weather)
  return(

    <div className="d-flex text-right justify-content-end w-100 p-3">
      <div className="text-right mr-2" style={{fontSize: '.9rem', color: '#ccc'}}>
        {weather.name} weather: &nbsp;
        {weather.weather[0].description}  
        <img width="30px" style={{filter: 'grayscale(75%)'}} className="mb-1" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  alt="Park Hopper - Weather News" />
        {Math.round(weather.main.temp)}&deg;F &nbsp;
        <WiStrongWind size={24} color='#ccc' />
        {weather.wind.speed}mph
      </div>
    </div>

  )
}

    // ---------------------------- if the user is logged IN
    const loggedIn = (
    <>
      <Navbar bg="dark" variant="dark">    
        <Nav>
          <Nav.Link href="/" style={{borderRight: '3px solid #454e56', paddingRight: '30px'}}><img src={logoMain}  alt="Park Hopper - Find your next National Park" /></Nav.Link>
          <Nav.Link style={{marginTop: '20px', paddingLeft: '30px'}} href="/profile"><FaHeart/></Nav.Link><div style={{marginTop: '28px', paddingLeft: '20px', color: '#454e54'}}>|</div><Nav.Link style={{marginTop: '20px', paddingLeft: '30px'}} href="/"><span onClick={props.handleLogout}>Logout</span></Nav.Link>
        </Nav>
        {weather ? <Weather/> : ''}
      </Navbar>
    </>
    )
    // ---------------------------- if the user is logged OUT
    const loggedOut = (
    <>
      <Navbar bg="dark" variant="dark" >
        <Nav className="mr-auto justify-content-end">
          <Nav.Link href="/" style={{borderRight: '3px solid #454e56', paddingRight: '30px'}}><img src={logoMain}  alt="Park Hopper - Find your next National Park"/></Nav.Link>
          <Nav.Link style={{marginTop: '20px', paddingLeft: '30px', width: '95px'}} href="/login"> Log in </Nav.Link><span style={{marginTop: '28px', paddingLeft: '10px', color: '#454e54'}}>|</span><Nav.Link style={{marginTop: '20px', paddingLeft: '20px'}} href="/register">Register</Nav.Link>
        </Nav>

        {weather ? <Weather/> : ''}

      </Navbar>
    </>
    )

    return(
        <nav>

           {props.currentUser ? loggedIn : loggedOut}

        </nav>
    )
}