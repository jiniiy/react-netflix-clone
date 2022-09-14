import axios from '../../api/axios';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  

export default function SearchPage(){ //useLocation을 아용한 검색 페이지 구현하기
    
    const [searchResults, setSearchResults] = useState([]);
    const useQuery =() => {
        return new URLSearchParams(useLocation().search);
    } //Search Term이 바뀔때마다(검색란에 검색어 입력할때마다) 새로 영화 데이터 가져오기!

    console.log('useLocation()',useLocation());
  
    let query = useQuery();
    const searchTerm = query.get("q")
    console.log('searchTerm', searchTerm);
   
    useEffect(() => {
    if(searchTerm) {
        fetchSearchMovie(searchTerm);
    }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error){ //매번 fetchSearchMovie함수로 요청을 보낼 때, 에러가 난다면 , 잡기
            console.log("error", error);
        }
    }
   
    return <div></div>;
}



