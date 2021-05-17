import logo from './images/logo_completo.png';
import './index.css';
import './App.css';
// Translations
import i18n from "./i18n/index.js";

import React, {Suspense} from 'react'
import { SplitText } from './animations/SplitText'
import { AnimatePresence, motion } from 'framer-motion'

// Router
import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <Suspense fallback="loading">
      <Router>
        <div className="App">
          <header className="App-header bg-brand_primary">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1>
            <AnimatePresence>
              {(
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-typography_primary"
                >
                  <SplitText
                    initial={{ y: '100%' }}
                    animate="visible"
                    variants={{
                      visible: i => ({
                        y: 0,
                        transition: {
                          delay: i * 0.2
                        }
                      })
                    }}
                  >
                    {i18n.t('welcome_wip')}
                  </SplitText>
                </motion.div>
              )}
            </AnimatePresence>
            </h1>
          </header>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
