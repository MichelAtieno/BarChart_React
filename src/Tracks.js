import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Tracks = () => {

	// Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('');
	const [tracks, setTracks] = useState([]);

	// Artist ID from Spotify
	const id = '4Rj9lQm9oSiMlirgpsM6eo';
	
	const market = 'KE';

	useEffect(()=>{

		// Api call for retrieving token
		axios('https://accounts.spotify.com/api/token', {
			'method': 'POST',
			'headers': {
				 'Content-Type':'application/x-www-form-urlencoded',
				 'Authorization': 'Basic ' + (new Buffer('73ffabe4e72e483e906aed2f0c914f87' + ':' + '3bbb1b0c4dbb44ed88799046ccbf728d').toString('base64')),
			},
			data: 'grant_type=client_credentials'
		}).then(tokenresponse => {
			console.log(tokenresponse.data.access_token);
			setToken(tokenresponse.data.access_token);

			// Api call for retrieving tracks data
			axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,{
				'method': 'GET',
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + tokenresponse.data.access_token
				}
			}).then(trackresponse=> {
				console.log(trackresponse.data.tracks);
				setTracks(trackresponse.data.tracks);
			}).catch(error=> console.log(error))
		}).catch(error => console.log(error));
	},[])


    return (
        <div></div>
    )
}

export default Tracks;