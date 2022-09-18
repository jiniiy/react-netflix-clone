import React, { useRef } from "react";
import "./MovieModal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";

function MovieModal({ //MovieModal 컴포넌트의 props정의해주기(내려주기)
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
})  {
    const ref = useRef(); //modal 창 외부영역 클릭시, 모달 닫게 만드는 useRef()와 Hooks함수_useOnClickOutside를 사용해서 구현하기!
    useOnClickOutside(ref,() => {setModalOpen(false)})

    return <div className="presentation">
        <div className="wrapper-modal">
            <div className="modal" ref={ref}>  
                <span onClick={() => setModalOpen(false)} className="modal-close">
                    X
                </span>
                
                <img 
                    className="modal__poster-img"
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="modal__poster-img"
                />

                <div className="modal__content">
                    <p className="modal__details">
                        <span className="modal__user_perc">100% for you</span>
                        {release_date ? release_date : first_air_date}
                    </p>

                    <h2 className="modal__titile">{title? title: name}</h2>
                    <p className="modal__overview"> 평점: {vote_average}</p>
                    <p className="modal__overview"> {overview}</p>
                </div>
            </div>
        </div>
    </div>;
}

export default MovieModal;