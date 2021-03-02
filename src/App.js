import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './components';
import { useSelector } from 'react-redux';

function App() {

  const cities = useSelector(state => state.cities)

  return (

    <div className="App">
      <Router>
        {/* <Navigation /> */}
        <Switch>
          {Object.entries(cities).map(([key, value]) => {
            const path = `/${key}`
            return (
              <Route path={path} exact component = {() => <Home city={key} />} />
            )}) }
          <Route path="/scenicSpot" exact component={() => <Home />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
