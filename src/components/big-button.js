import React from 'react'

const BigButton = function(props) {
	return (
		<button
			className="f5 link dim br1 ba ph3 pv2 mb2 dib black"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}

export default BigButton
