import { useState } from 'react';
import Layout from './layout/layout.jsx';
import GlLayout from './layout/GlLayout.jsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Layout /> 
      {/* <GlLayout />  */}
     
    </>
  )
}

export default App
