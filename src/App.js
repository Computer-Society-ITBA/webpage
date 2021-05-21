import './index.css';
import './App.css';


import React, {Suspense} from 'react'

// Router
import {
  BrowserRouter as Router
} from "react-router-dom";

const Homepage = React.lazy(() => import('./components/pages/homepage'));

function App() {
  return (
    <Suspense fallback="loading">
      <Router>
        <div className="App">
          <Homepage/>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
