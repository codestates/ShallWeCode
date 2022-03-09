import React from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../loading/Loading';
import "./Thumbnail.css"

function Thumbnail(props) {

    const { thumbnail } = props
    const history = useHistory()
    const boardClick = (contentId) => {
        history.push({
            pathname: '/Detail',
            state: { contentId: contentId }
        })
    }
    return (
        <div className="thumbnailSection ">
                {!thumbnail ? <Loading/>
                    : thumbnail.map((data, i) => {
                        return (
                        <div key={i} className="thumbnailBox" onClick={() => boardClick(data.id)}>
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