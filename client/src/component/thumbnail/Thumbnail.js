import React from 'react';
import "./Thumbnail.css"

function Thumbnail(props) {

    const { thumbnail } = props
    console.log(thumbnail)
    return (
        <div className="thumbnailSection">
            <div className="thumbnailBoxFlax">
                {!thumbnail ? <div className="thumbnailBox"> <div className="thumbnailBoxTitle">데이터가 없습니다.</div></div>
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
        </div>
    );
}
                {/* <button className="thumbnailTagBtn miniBtn filterMiniBtn">Javascript</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Typescript</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Node.js</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Node.js</button> */}

export default Thumbnail;