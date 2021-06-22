import './index.css';
import './App.css';


import React, {Suspense} from 'react'

// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Credits = React.lazy(() => import('./components/pages/credits'));
const Homepage = React.lazy(() => import('./components/pages/homepage'));
const PastEvents = React.lazy(() => import('./components/pages/past_events'));

function App() {
  return (
    <Suspense fallback={
      (<div className="flex flex-row w-full h-screen items-center justify-center text-brand_primary">loading...</div>)
    }>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/credits">
              <Credits/>
            </Route>
            <Route exact path="/past-events">
              <PastEvents/>
            </Route>
            <Route exact path="/">
              <Homepage/>
            </Route>
            <Redirect from='*' to='/'/>
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
