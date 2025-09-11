import "./index.css";
import "./App.css";

import React, { Suspense } from "react";
import "./styles/loader.css";

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Credits = React.lazy(() => import("./components/pages/credits"));
const Homepage = React.lazy(() => import("./components/pages/homepage"));
const PastEvents = React.lazy(() => import("./components/pages/past_events"));
const GameJam = React.lazy(() => import("./components/pages/gamejam"));
const Hackit = React.lazy(() => import("./components/pages/hackit"));
const QuantumJam = React.lazy(() => import("./components/pages/quantum_jam"));

function App() {
  return (
    <Suspense fallback={<div className="loader" />}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/credits" element={<Credits />} />
            <Route path="/gamejam" element={<GameJam />} />
            <Route path="/hackit" element={<Hackit />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/quantum-jam" element={<QuantumJam />} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
