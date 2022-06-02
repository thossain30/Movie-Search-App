import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavorite from './Components/AddFavorites';
import RemoveFavorites from './Components/RemoveFavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [SearchValue, setSearchValue] = useState('');
	const getMovieRequest = async (SearchValue) => {
        const url = `http://www.omdbapi.com/?s=${SearchValue}&apikey=e8adec52`
        const response = await fetch(url);
        const responseJSON = await response.json();

        if (responseJSON.Search) {
            setMovies(responseJSON.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(SearchValue);
    }, [SearchValue]);

    useEffect(() => {
        const movieFavorites = JSON.parse(
            localStorage.getItem('react-movie-app-favorites')
        );

        setFavorites(movieFavorites);
    }, [])

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
    }

    const addFavoriteMovie = (movie) => {
        const newFavoriteList = [...favorites, movie];
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    }

    const removeFavoriteMovie = (movie) => {
        const newFavoriteList = favorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID
        );

        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    }

	return (
		<div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mb-4 mt-4'>
                <MovieListHeading heading = "Movies"/>
                <SearchBox SearchValue = {SearchValue} setSearchValue = {setSearchValue}/>
            </div>
            <div className='row'>
                <MovieList 
                    movies = {movies} 
                    handleFavoritesClick={addFavoriteMovie} 
                    favoriteComponent = {AddFavorite}
                />
            </div>
            <div className='row d-flex align-items-center mb-4 mt-4'>
                <MovieListHeading heading = "Favorites"/>
            </div>
            <div className='row'>
                <MovieList 
                    movies = {favorites} 
                    handleFavoritesClick={removeFavoriteMovie} 
                    favoriteComponent = {RemoveFavorites}
                />
            </div>            
		</div>
	);
};

export default App;