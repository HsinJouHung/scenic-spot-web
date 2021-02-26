import React from "react";
import { useDispatch } from 'react-redux'
import { setScenicSpotList } from "../actions";
import SpotInfoTable from './SpotInfoTable'
import CityDrawer from './CityDrawer'

function Home() {

  const dispatch = useDispatch()

  const requestOptions = {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  };



  React.useEffect(() => {
    fetch('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON', requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
        dispatch(setScenicSpotList(data))
        localStorage.setItem('data', data)
      })
      .catch(error => console.error('Error:', error))
  })

  return (
    <div className="home">
      <CityDrawer /> 
      {/* <h1>hello world!</h1> */}
      {/* <SpotInfoTable /> */}
    </div>
  );
}

export default Home;