import axios from "../api/axios";
//라이브러리에 그냥 설치된 axios를 import가져오면, API가 localhost로 불러와버리게됨.
//때문에, 만들어줬던 api폴더에 axios.js에 변수 설정한 instance로(실제API) 불러와야 한다!!!
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    //console.log(request);

    //여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정 영화의 더 상세한 정보를 가져오기(비디오 플레이정보포함) //instance에 정의되지 않은 APIURL이므로, 다시 axios.get으로 호출해야함!
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      //위의 { data: movieDetail}로 쓰면, API의 Data계층의 다양한 데이터들이, movieDetail에 들어가게된다!!!!
      params: { append_to_response: "videos" }, //"Data계층에서 video가 아니라,  params:"videos"넣어야 영상정보를 불러올수 있다! "
    });
    //console.log("results", results);
    setMovie(movieDetail);
    console.log("movieDetail", movieDetail);
  };

  //banner__description 부분이 100줄보다 길면, 잘라서  "..."표시!, 아니면 모두 보이게함.
  const truncate = (string, number) => {
    return string?.length > number
      ? string.substring(0, number - 1) + "..."
      : string;
  };

  //Banner UI만들기
  if (!isClicked) {
    //isClicked=false
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className='banner__buttons'>
            <button
              className='banner__button play'
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className='banner__button info'>More Information</button>
          </div>
          <h1 className='banner__description'>
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className='banner--fadeBottom' />
      </header>
    );
  } else {
    //isClicked = true
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title='YouTube video player'
            frameborder='0'
            allow='autoplay; fullscreen'
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
