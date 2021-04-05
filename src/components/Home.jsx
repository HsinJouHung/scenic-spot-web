import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setCurrCity } from "../actions";
import CityDrawer from './CityDrawer'

function Home(props) {

  const dispatch = useDispatch()
  const cityName = useSelector(state => state.currCity)

  React.useEffect(() => {
    dispatch(setCurrCity(props.city))
    console.log('cccc', cityName)
  }, [])

  return (
    <div className="home" id = 'head'>
      {/* <h2>{cityName}</h2> */}
      <CityDrawer city = {props.city}/> 
      {/* <h1>hello world!</h1> */}
      {/* <SpotInfoTable /> */}
    </div>
  );
}

export default Home;