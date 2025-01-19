import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to={'/'}><img src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg" alt="" /></Link>
        <Link to={'/'}>Home</Link>
        <Link >Hotels</Link>
        <Link >Places</Link>
        <Link>SignIn</Link>
  


    </div>
  )
}

export default Navbar