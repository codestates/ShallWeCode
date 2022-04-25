import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Banner from '../../component/banner/Banner'
import Contents from '../../component/contents/Contents'
import Footer from '../../component/footer/Footer'
import Loading from '../../component/loading/Loading'
import Navbar from '../../component/navbar/Navbar'
import './Main.css'


function Main() {
  return (
    <div className='wrapper'>
      <div className='contentWrapper'>
        <Navbar />
        <Banner />
        <Contents/>
      </div>
        <Footer />
    </div>
  )
}

export default Main