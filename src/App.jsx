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
const News = React.lazy(() => import("./components/pages/news"));
const NewsArchive = React.lazy(() => import("./components/pages/news_archive"));
const Admin = React.lazy(() => import("./components/pages/admin"));

function App() {
  return (
    <Suspense fallback={<div className="loader" />}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/credits" element={<Credits />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/news" element={<NewsArchive />} />
            <Route path="/news/:slug" element={<News />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
