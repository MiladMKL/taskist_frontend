import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

/*
 * Das ist ein eigenes React Component
 * bzw. eine eigene mini React App
 */

// Unnamed function is wrapped in forwardRef
const Toggleable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	// Ich verwende refs die ich bekommen habe und mache 'toggleVisibility' Methode für äußere zugänglich!
	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

// Must bei Toggleable 'buttonLabel' unbedingt mitgeben!
Toggleable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
