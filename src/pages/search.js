import React from 'react'
import Header from '../containers/header'
import { Link } from 'react-router-dom'
import { TextField, Button, List, ImageListItem } from 'jrs-react-components'
import { connect } from 'react-redux'
import {
	SET_SEARCH_TEXT,
	SET_SEARCH_RESULTS,
	CLEAR_RESULTS,
	SET_FAVORITE
} from '../constants'
import { map } from 'ramda'

const Search = props => {
	const movieListItem = result => {
		return (
			<ImageListItem
				key={result.imdbID}
				title={result.Title}
				image={result.Poster}
				link={
					<Button onClick={props.selectMovie(props.history, result)}>
						Select
					</Button>
				}
			/>
		)
	}

	return (
		<div className="avenir">
			<Header />
			<main>
				<div className="mw6 center mt2 tc">
					<h2>Search</h2>
					<form className="ph2 tl" onSubmit={props.handleSubmit}>
						<TextField
							label="Search"
							value={props.searchText}
							onChange={props.handleChange}
						/>
						<div>
							<Button>Search</Button>
						</div>

					</form>

					<List>
						{map(movieListItem, props.searchResults)}
					</List>

				</div>
			</main>
		</div>
	)
}
const connector = connect(mapStateToProps, mapActionsToProps)

function searchMovies(dispatch, getState) {
	const searchText = getState().search.searchText
	const url = process.env.REACT_APP_MOVIE_API + '&s=' + searchText
	console.log(url)
	fetch(url).then(res => res.json()).then(movieSearchResults => {
		if (movieSearchResults.Response === 'False') {
			alert('No results found...')
			return
		}
		dispatch({ type: SET_SEARCH_RESULTS, payload: movieSearchResults.Search })
	})
}

function mapActionsToProps(dispatch) {
	return {
		selectMovie: (history, movie) => e => {
			const fave = {
				title: movie.Title,
				year: movie.Year,
				poster: movie.Poster,
				imdbID: movie.imdbID
			}
			dispatch({ type: SET_FAVORITE, payload: fave })
			dispatch({ type: CLEAR_RESULTS })
			history.push('/new')
		},
		handleSubmit: e => {
			e.preventDefault()
			dispatch(searchMovies)
		},

		handleChange: e => {
			dispatch({ type: SET_SEARCH_TEXT, payload: e.target.value })
		}
	}
}

function mapStateToProps(state) {
	return {
		searchText: state.search.searchText,
		searchResults: state.search.searchResults
	}
}

export default connector(Search)
