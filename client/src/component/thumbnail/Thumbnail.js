import React from 'react';
import "./Thumbnail.css"

function Thumbnail(props) {
    return (
        <div className="thumbnailSection">
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