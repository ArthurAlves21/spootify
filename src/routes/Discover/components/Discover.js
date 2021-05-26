
import React, { useState, useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../config'
import axios from 'axios';

function Discover () {


    const [playlist, setPlaylist] = useState("");
    const [genres, setGenres] = useState("");
    const [releases, setReleases] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        axios('https://accounts.spotify.com/api/token', {
          headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(api.api.clientId + ':' + api.api.clientSecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          setToken(tokenResponse.data.access_token);

          const releasesApi = axios('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token},
          })
  
          const genreApi = axios('https://api.spotify.com/v1/browse/categories', {
            method: 'GET',  
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token},
          })
          

          const playlistApi = axios(`https://api.spotify.com/v1/browse/featured-playlists`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}, 
          })

          axios.all([playlistApi, genreApi, releasesApi]).then(axios.spread((...responses) => {
            setReleases(
              responses[2].data.albums.items
            )
            setGenres(
              responses[1].data.categories.items
            )
            setPlaylist(
              responses[0].data.playlists.items
            )
          }))
        });
        console.log(playlist);
    }, []); 


    const data = {
      newReleases: releases || [],
      playlists:  playlist || [],
      categories:  genres || [], 
    };

    const { newReleases, playlists, categories } = data;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} /> 
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
}

export default Discover;