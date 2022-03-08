import React from 'react';
import Banner from '../../component/banner/Banner';
import Filter from '../../component/filter/Filter';
import Footer from '../../component/footer/Footer';
import Loading from '../../component/loading/Loading';
import Navbar from '../../component/navbar/Navbar';
import SelectBtn from '../../component/selectBtn/SelectBtn';
import Thumbnail from '../../component/thumbnail/Thumbnail';
import "./Main.css"


function Main(props) {
  const { isLogin, handleLogout, thumbnail } = props
  console.log(isLogin)
  return (
    <div className="basicBackground">
      <Navbar isLogin={isLogin} handleLogout={handleLogout}/>
      <Banner />
      <SelectBtn />
      <Filter />
      <Thumbnail thumbnail={thumbnail}/>
      {/* <Loading/> */}
      <Footer />
    </div>
  );
}

export default Main;