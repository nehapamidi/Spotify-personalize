import React, {Component} from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

var playlists = [];
const spotifyWebApi = new Spotify();



class App extends Component  {
  constructor() {
   super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true: false,
      nowPlaying: {
      name: "Not Checked",
      image: " "
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url

        }

    })
  })
  }

  getSavedTracks(){
    spotifyWebApi.getMySavedTracks()
    .then(function(response) {
      console.log(response); 
  })
}

  getPlaylists(){
    spotifyWebApi.getUserPlaylists()  
    .then(function(response) {
      console.log(response);
      for (var i = 0; i < response.items.length; i++) {
        playlists[i] = [response.items[i].name];
      }
     console.log(playlists);
    })
  }

  love(){
  spotifyWebApi.searchArtists('Love')
  .then(function(response) {
    console.log('Search artists by "Love"', response);
  })
}



  render() {
    return(
      <div className='App'>
      <a href='http://localhost:8888'>
        <button>
          Login With Spotify
        </button>
      </a>
        <div> Now Playing : {this.state.nowPlaying.name}</div>
          <div>
              <img src = {this.state.nowPlaying.image} styles = {{width: 100}}/>
          </div>
            <button onClick = {() => this.getNowPlaying()}>
              Check Now Playing
            </button>
            <button onClick = {() => this.getPlaylists()}>
              Get Playlists
            </button>
            <button onClick = {() => this.love()}>
              Get Love 
            </button>
            <button onClick = {() => this.getSavedTracks()}>
              Get Saved Tracks 
            </button>
        </div>
        
  );
}
}
export default App;