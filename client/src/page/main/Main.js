import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Banner from '../../component/banner/Banner'
import Contents from '../../component/contents/Contents'
import Footer from '../../component/footer/Footer'
import Loading from '../../component/loading/Loading'
import Navbar from '../../component/navbar/Navbar'
import './Main.css'


function Main(props) {
  const { isLogin, handleLogout, userinfo} = props

  return (
    <div>
      <Navbar isLogin={isLogin} userinfo={userinfo} handleLogout={handleLogout}/>
      <Banner />
      <Contents/>
      <Footer />
    </div>
  );
}

export default Main;