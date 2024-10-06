import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'


import YouTube from 'react-youtube';

const Particularmovie = () => {
    let detail = useLocation();
    // console.log(detail);
    let matter = detail.state.x;

let [trailers,setTrailers]=useState("");
async function play(id) {
    fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=caa70c793d4d1bd32591a3325ee86e3e`)
    .then(x=>x.json()).then(y=>setTrailers(y.results[0].key))
    .catch(err => console.log('error', err));
}
    
  return (
    <div style={{height:"600px", width:"550px"}}>
    <img style={{height:"350px", width:"100%"}} src={`https://image.tmdb.org/t/p/original/${matter.backdrop_path}`} alt='images'/>
    <h1>{matter.title}</h1>
    <p>{matter.overview}</p>
    <strong>{matter.vote_average}</strong> <br/>
    <button onClick={()=>play(matter.id)}>Play Trailer</button>
    <div>
        {trailers && <YouTube videoId={trailers}/>}
    </div>
    </div>
  )
}

export default Particularmovie
