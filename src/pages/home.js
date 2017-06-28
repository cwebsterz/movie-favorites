import React from 'react'
import Header from '../containers/header'
import {
	Button,
	List,
	ImageListItem,
	SimpleListItem
} from 'jrs-react-components'
import LinkButton from '../components/link-button'
import { map } from 'ramda'
import { connect } from 'react-redux'

const Home = function(props) {
	function li(fave) {
		return (
			<ImageListItem
				id={fave.id}
				key={fave.id}
				title={fave.title}
				image={fave.poster}
				year={fave.year}
				link={<LinkButton to={`/show/${fave.id}`}>Details</LinkButton>}
			/>
		)
	}

	return (
		<div>
			<Header />
			<main>
				<div className="mw6 center mt2 tc">
					<List>
						<SimpleListItem
							title="Add New Favorite"
							link={<LinkButton to="/new">Add</LinkButton>}
						/>
						{map(li, props.favorites)}
					</List>
				</div>
			</main>
		</div>
	)
}

const connector = connect(mapStateToProps)

function mapStateToProps(state) {
	return {
		favorites: state.favorites
	}
}

export default connector(Home)

function openDocs(e) {
	if (/localhost/.test(window.location.href)) {
		window.location = 'http://localhost:5000'
	} else {
		window.location =
			'https://github.com/jrs-innovation-center/jrscode-react-starter#jrs-react-starter-kit'
	}
}
