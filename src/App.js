import logo from './images/logo_completo.png';
import './index.css';
import './App.css';

import React from 'react'
import { SplitText } from './animations/SplitText'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  return (
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
                Bienvenidos a CS ITBA, esto es un work in progress!
              </SplitText>
            </motion.div>
          )}
        </AnimatePresence>
        </h1>
      </header>
    </div>
  );
}

export default App;
