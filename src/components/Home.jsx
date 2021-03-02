import React from "react";
import { useDispatch } from 'react-redux'
import { setCurrCity } from "../actions";
import CityDrawer from './CityDrawer'

function Home(props) {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setCurrCity(props.city))
  }, [])

  return (
    <div className="home">
      <CityDrawer city = {props.city}/> 
      {/* <h1>hello world!</h1> */}
      {/* <SpotInfoTable /> */}
    </div>
  );
}

export default Home;