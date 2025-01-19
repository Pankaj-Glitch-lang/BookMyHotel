import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Hotels from './component/Hotels'
import Places from './component/Places'
import Signin from './component/Signin'
import Navbar from './component/Navbar'
import Booking from './component/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels/:id' element={<Hotels/>}/>
      <Route path='/places' element={<Places/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/booking/:id/:roomId' element={<Booking/>}/>
      
      

    </Routes>
    </>
  )
}

export default App
