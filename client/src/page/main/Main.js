import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Banner from '../../component/banner/Banner';
import Filter from '../../component/filter/Filter';
import Footer from '../../component/footer/Footer';
import Loading from '../../component/loading/Loading';
import Navbar from '../../component/navbar/Navbar';
import SelectBtn from '../../component/selectBtn/SelectBtn';
import Thumbnail from '../../component/thumbnail/Thumbnail';
import "./Main.css"


function Main(props) {
  const { isLogin, handleLogout, userinfo, thumbnail, filteredThumbnail } = props
  const [ PRorTP, setPRorTP ] = useState('1')
  const [languageFilter, setLanguageFilter] = useState([]);

  const filterOfLanguage = (language) => {
    setLanguageFilter(language)
  }
  
  const filterOfPRorTP = (PRorTP) => {
    setPRorTP(PRorTP)
  }

  useEffect(() => {
    axios.get("http://localhost:4000/board/filter", { params: {stack: languageFilter.join(''), PRorTP }}).then((res) => {
      if (res.data.message === '필터에 맞는 게시물이 존재하지 않습니다') {
        console.log(res.data.message)
      }
      else if (res.status === 200) {
        filteredThumbnail(res.data.data.data)
      }
    }).catch((err) => {
      console.log(err);
    })  }, [languageFilter, PRorTP]);

  return (
    <div className="basicBackground">
      <Navbar isLogin={isLogin} userinfo={userinfo} handleLogout={handleLogout}/>
      <Banner />
      <SelectBtn PRorTP={PRorTP} filterOfPRorTP={filterOfPRorTP}/>
      <Filter thumbnail={thumbnail} filteredThumbnail={filteredThumbnail} PRorTP={PRorTP} languageFilter={languageFilter} filterOfLanguage={filterOfLanguage}/>
      <Thumbnail thumbnail={thumbnail}/>
      {/* <Loading/> */}
      <Footer />
    </div>
  );
}

export default Main;