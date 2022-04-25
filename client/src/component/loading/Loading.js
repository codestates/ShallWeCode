import React from 'react'
import './Loading.css'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { BallTriangle } from  'react-loader-spinner'

function Loading(props) {
  return (
    <div className='textCenter'>
      <div className='spinner'>
        <BallTriangle
            className ='loadingGif'
            // height='100'
            // width='100'
            color='#298854'
            ariaLabel='loading'
        />
      <div className='spinnerText'>Loading...</div>
      </div>
    </div>
  )
}

export default Loading