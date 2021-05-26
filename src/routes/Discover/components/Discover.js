
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
    const [isLoading, setIsLoading] = useState("");

    useEffect(() => {
      setIsLoading(true);
        axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(api.api.clientId + ':' + api.api.clientSecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          console.log(tokenResponse.data.access_token)
          setToken(tokenResponse.data.access_token)

          fetch("https://api.spotify.com/v1/browse/new-releases?limit=50", {
            method: "GET",
            headers: {Authorization: `Bearer ${tokenResponse.data.access_token}`}
          })
          .then(response => response.json())
          .then((data) => {setReleases(data.albums.items)})

          fetch("https://api.spotify.com/v1/browse/categories?limit=50", {
            method: "GET",
            headers: {Authorization: `Bearer ${tokenResponse.data.access_token}`}
          })
          .then(response => response.json())
          .then((data) => {setGenres(data.categories.items)})

          fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=50", {
            method: "GET",
            headers: {Authorization: `Bearer ${tokenResponse.data.access_token}`}
          })
          .then(response => response.json())
          .then((data) => {setPlaylist(data.playlists.items)})
        });
    }, []); 



    const data = {
      newReleases: releases || [],
      playlists:  playlist || [],
      categories:  genres || [], 
    };

    const { newReleases, playlists, categories } = data;

    useEffect(() => {
      setIsLoading(false)
    })

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} isLoading={isLoading} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} isLoading={isLoading}/> 
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" isLoading={isLoading}/>
      </div>
    );
}

export default Discover;