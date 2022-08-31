import axios from "../api/axios"; //우리가 api폴더에서 정의한 axios URL를 가져와야 한다! baseURL: "https://api.themoviedb.org/3"
import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import "./Row.css";

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
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={()=> handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span
            className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">>"}
          </span>
        </div>
      </div>

        {modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
        )}
    </section>
  );
}
