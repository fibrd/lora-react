import React from 'react'
import { getRandomNames } from './utils'
import { Game } from './views/Game'

function App() {
	// Nastaveni jmen protihracu pri inicializaci
	const playerNames = getRandomNames()

	return (
		<div className="App">
			<Game playerNames={playerNames} />
		</div>
	)
}

export default App
