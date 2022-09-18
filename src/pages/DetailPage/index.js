import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage(){
    //movie.id(key값)을 가지고 영화정보 상세페이지 가져오기
    const { movieId } = useParams(); //useParas를 이용해서, movieId값을 가져오기
    console.log('movieId', movieId);
    const [movie, setMovie] = useState({}); //movieId값으로 불러온 데이터정보를 useState값에 저장해준다.

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(
                `/movie/${movieId}`
            )
            console.log('request',request);
            setMovie(request.data)
        }
        fetchData();
    }, [movieId]); //moiveId값이 바뀔때마다, useEffect(() => {}) 를 콜해주게 된다!

    if(!movie) return <div>...loading</div>; //movieId값으로 불러온 movie 데이터 정보가 없을 때, UI표시!

    return <section>
        <img 
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="post"
        />
    </section>; //movieId값으로 불러온 movie 데이터 정보가 있을 때, UI표시!


}