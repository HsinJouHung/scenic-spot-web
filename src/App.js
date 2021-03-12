import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Home } from './components';
import { useSelector } from 'react-redux';

function App() {

  const cities = useSelector(state => state.cities)

  React.useEffect(() => {
    console.log('cities', cities)
  })

  return (

    <div className="App">
      <Router>
      <Redirect from = '/' to = '/scenicSpot'/>
        {/* <Navigation /> */}
        <Switch>
          {Object.entries(cities).map(([key, value]) => {
            return (
              <Route path={`/scenicSpot/${key}`} exact component = {() => <Home city={key} />} />
            )}) }
          <Route path="/scenicSpot" exact component={() => <Home />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
