import axios from "../api/axios"; //우리가 api폴더에서 정의한 axios URL를 가져와야 한다! baseURL: "https://api.themoviedb.org/3"
import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import "./Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const[modalOpen, setModalOpen] = useState(false);
  const[movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    //정보를 가져올떼, 서버에 API를 axios를 사용해서 비동기 요청한다!!!!
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie);
  };

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper 
          // Slider-> Swiper로 변경해주기!!!
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          //spaceBetween={50}
          //slidesPerView={5}
          //scrollbar={{ draggable: true }}
          //onSwiper={(swiper) => console.log(swiper)}
          //onSlideChange={() => console.log('slide change')}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            }
          }}
          navigation
          pagination={{ clickable: true }}
        >
          <div id={id} className='row__posters'>
            {movies?.map((movie) => ( // useEffect(() => {fetchMovieData(); 렌더링실시 할때, 방어코드 UseEffect내 스테이트값이 없을때, 에러나지않게 movies?.map()
              <SwiperSlide>
                <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={()=> handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        {modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
        )}
    </section>
  );
}
