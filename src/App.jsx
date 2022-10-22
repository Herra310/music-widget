import { useState, useEffect } from "react";
import "./App.css";

function App() {
   const USER_TRACKLIST = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Herra310&limit=1&api_key=${process.env.REACT_APP_KEY}&format=json`;

   const [track, setTrack] = useState({ name: "", artist: "" });

   const getSong = () => {
      fetch(USER_TRACKLIST)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setTrack({
               name: data.recenttracks.track[0].name,
               artist: data.recenttracks.track[0].artist["#text"],
               cover: data.recenttracks.track[0].image[3]["#text"],
            });
         });
   };

   useEffect(() => {
      if (track.name === "") getSong();
      const interval = setInterval(() => {
         getSong();
      }, 10000);
      return () => clearInterval(interval);
   });

   const animation = {
      animation: 'animate 15s linear infinite',
   }
   
   const bgimg = {
      backgroundImage: `url('${track.cover}')`,
   };

   return (
      <div className="App">
         <div className="bg" style={bgimg}>
            <div className="cont">
               <div className="album-cover">
                  <img src={track.cover} alt="" />
               </div>
               <div className="music-info">
                  <h2 className="track" style={ track.name.length>17 ? animation : null }> {track.name}</h2>
                  <h4 className="artist"> {track.artist}</h4>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
