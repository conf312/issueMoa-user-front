import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import YouTube from 'react-youtube';
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function Youtube() {
  const [youtubeList, setYoutubeList] = useState([]);

  useEffect(() => {
    const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;
    AxiosUtil.send("GET", "/googleapisYoutube?part=id&chart=mostPopular&maxResults=10&regionCode=kr&key=" + YOUTUBE_KEY
      , "", "", (e) => {
      setYoutubeList(e.items);
    });
  }, []);

  return (
    <>
      <h3 className="fw-bold mt-5">Youtube</h3>
      <div className="m-3">
        <Row className="item-youtube">
          {youtubeList.map((data) => (
            <Col>
              <YouTube
                videoId={data.id}
                opts={{
                  width: "300",
                  height: "250",
                  playerVars: {
                    modestbranding: 1 // 컨트롤 바에 youtube 로고를 표시하지 않음
                  },
                }}
                onEnd={(e)=>{e.target.stopVideo(0);}}      
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Youtube;
