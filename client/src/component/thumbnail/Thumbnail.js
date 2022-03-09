import React from 'react';
import Loading from '../loading/Loading';
import "./Thumbnail.css"

function Thumbnail(props) {

    const { thumbnail } = props
    return (
        <div className="thumbnailSection ">
                {!thumbnail ? <Loading/>
                    : thumbnail.map((data, i) => {
                        return (
                        <div key={i} className="thumbnailBox">
                            <div className="thumbnailBoxTitle">
                                <div>{data.title}</div>
                            </div>
                            <div className="thumbnailBoxTag">
                            {data.stack.map((language,i) => {
                            return <button key={i} className="thumbnailTagBtn miniBtn filterMiniBtn">{language}</button>
                            })}
                            </div>
                        </div>
                        )
                    })
                }
        </div>
    );
}

export default Thumbnail;