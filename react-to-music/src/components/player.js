import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPause, faPlay, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../util';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {
  //event
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying)
    }else {
      audioRef.current.play();
      setIsPlaying(!isPlaying)
    }
  }

  const getTime = (time) => {
    return Math.floor(time/60)+ ':' + ("0" + Math.floor(time % 60)).slice(-2);
  }

  const dragHandler = (e) =>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration})
  }

  const skipTrackHandler = (direction) =>{
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    let newIndex = currentIndex + direction;
    console.log(currentIndex, direction)
    if(newIndex < 0){
      playAudio(isPlaying,audioRef);
      newIndex = songs.length -1
    }else if(newIndex >= songs.length){
      newIndex = 0;
    }
    setCurrentSong(songs[newIndex]);
    playAudio(isPlaying,audioRef);
  }

  useEffect(()=>{
    const activeStateOfSongs = songs.map(eachSong=> {
      if(eachSong.id === currentSong.id){
        return {
          ...eachSong,
          active: true,
        }
      }else {
        return {
          ...eachSong,
          active: false
        }
      }
    })
    setSongs(activeStateOfSongs);
  },[currentSong])

  return(
    <div className="player-container">
      <div className="time-control">
        <span>{getTime(songInfo.currentTime)}</span>
        <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
        <span>{songInfo.duration? getTime(songInfo.duration) : '0:00'}</span>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="prev" onClick={()=> skipTrackHandler(-1)} size="2x" icon={faAngleLeft}/>
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x"  icon={isPlaying? faPause : faPlay}/>
        <FontAwesomeIcon className="next" onClick={()=> skipTrackHandler(1)} size="2x"  icon={faAngleRight}/>
      </div>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;