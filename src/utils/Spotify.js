const client_id = '305f48c100514d89802275f2ee4cc885';
const redirect_uri = encodeURIComponent('https://cryptsid_jamming1.surge.sh');
let accessToken='BQDu-9bo7tZbK8AVB_tLBPuq0-RpILc2-nFKtTT-89FF_w78wC7SSPdoii5pSG-CJHtpOXXhluuG-Cx7VeXL3iRhNOQOxEZK9ouqabCJNLlQRgX3qbgvlrpL6GCXPPWi3r3Gxp7S9_sG2MMY6VAYgynhb33dxiDjG6psum1-DaEr2KQ7jlz7Tjm2o29fqVMjyRK4nG39XQ';
let expiresIn;
const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
let Spotify = {
    getAccessToken() {
        if(accessToken !== undefined) return accessToken;
        else {
            if(window.location.href.includes('access_token')) {
                accessToken = window.location.href.match(/access_token=([^&]*)/)[0].slice(13, );
                expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].slice(11, );
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            }
            else {
                window.location = url;
            }
        }
    },
    search(searchTerm) {
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm.replace(/ /g,'%20')}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}` }
                }).then(response => response.json()).then((jsonResponse) => {
                    let resultArray = jsonResponse.tracks.items.map((item) => {
                        let trackObject = {};
                        trackObject['id'] = item.id;
                        trackObject['name'] = item.name;
                        trackObject['artists'] = item.artists;
                        trackObject['album'] = item.album.album_type;
                        trackObject['uri'] = item.uri;
                        return trackObject;
                    });
                    return resultArray;
                });
    },
    savePlaylist(playlistName, arrayURL) {
        if(playlistName === undefined || arrayURL === undefined) return;
        let headers = {Authorization: `Bearer ${accessToken}`};
        let headers1 = {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };        
        let userId;
        let playlistID;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then((jsonResponse) => {userId = jsonResponse.id; return userId;})
        .then((ui) => {
            fetch(`https://api.spotify.com/v1/users/${ui}/playlists`, {
                headers: headers1,
                method: 'POST', 
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json()).then((jsonResponse) => {return jsonResponse.id})
            .then((playlistID) => {
                fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
                    headers: headers1,
                    method: 'POST',
                    body: JSON.stringify({uris: arrayURL})
                }).then(response => response.json()).then(jsonResponse => jsonResponse.snapshot_id);
            });
        }); 
    }
};

export default Spotify;