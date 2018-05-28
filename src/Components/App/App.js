import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlists/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../utils/Spotify.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: [{id: "5BIMPccDwShpXq784RJlJp", name: "Enter Sandman", artists: [{name: 'Metallica'}], album: "album", uri: "spotify:track:5BIMPccDwShpXq784RJlJp"}], 
                  playlistName: 'SidsPlaylist',
                  playlistTracks: [{id: "5BIMPccDwShpXq784RJlJp", name: "Enter Sandman", artists: [{name: 'Metallica'}], album: "album", uri: "spotify:track:5BIMPccDwShpXq784RJlJp"}]
              };
    this.addTrack = this.addTrack.bind(this);  
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlylist = this.savePlylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    for(let i=0; i<this.state.playlistTracks.length; i++) {
      if(this.state.playlistTracks[i].id === track.id) return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter((tk) => {
      return tk.id !== track.id;
    });
    //console.log(newList);
    this.setState({playlistTracks: newList});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
    //console.log(name);
  }

  savePlylist() {
    let trackURIs = this.state.playlistTracks.map(tk => tk.uri);
    //console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then((res) => {this.setState({searchResults: res});});
  }

  render() {
    return (
        <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false} />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              isRemoval={true}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;