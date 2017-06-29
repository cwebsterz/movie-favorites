import React from 'react'
import MovieCard from '../components/movie-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SET_FAVORITE } from '../constants'
import { find, propEq } from 'ramda'

class Show extends React.Component {
	componentDidMount() {
		const findMoviePredicate = propEq('id', Number(this.props.match.params.id))

		const foundMovie = find(findMoviePredicate, this.props.favorites)

		this.props.dispatch({ type: SET_FAVORITE, payload: foundMovie })
	}

	render() {
		return (
			<div>
				<Header />
				<main>
					<div className="mw6 center mt2 tc">
						<MovieCard
							image={this.props.favorite.poster}
							title={this.props.favorite.title}
							year={this.props.favorite.year}
						/>
					</div>
					<div className="mw6 tc center">
						<Link to="/"><BigButton>Return</BigButton></Link>
					</div>
				</main>
			</div>
		)
	}
}

const connector = connect(mapStateToProps)

function mapStateToProps(state) {
	return {
		favorites: state.favorites,
		favorite: state.favorite
	}
}

export default connector(Show)
