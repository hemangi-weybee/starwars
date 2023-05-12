import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../component/Header'
import NavBar from '../component/NavBar'

function PageNotFound() {
    return (
        <div>
            <Header />
            <NavBar />
           <h1  className='notFound'> Page Not Found </h1>
           <Link to='/' className='goToHome'>Go to Homepage</Link>
        </div>
    )
}

export default PageNotFound