import React from 'react';
import "./Thumbnail.css"

function Thumbnail(props) {
    return (
        <div className="thumbnailSection">
        <div className="thumbnailBoxFlax">
            <div className="thumbnailBox">
                <div className="thumbnailBoxTitle">
                    <div>쉘위코드 팀원을 모집 합니다</div>
                </div>
                <div className="thumbnailBoxTag">
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Javascript</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Typescript</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Node.js</button>
                <button className="thumbnailTagBtn miniBtn filterMiniBtn">Node.js</button>
                </div>

            </div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
        </div>

        <div className="thumbnailBoxFlax">
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
        </div>

        <div className="thumbnailBoxFlax">
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
        </div>

        <div className="thumbnailBoxFlax">
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
            <div className="thumbnailBox"></div>
        </div>
        </div>
    );
}

export default Thumbnail;