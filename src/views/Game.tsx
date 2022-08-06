import React, { useCallback, useEffect, useState } from 'react'
import { DeckHero } from '../components/DeckHero'
import {
	clearBoard,
	removeCard,
	selectCards,
	shuffleCards,
} from '../store/slices/cardsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { DeckOpponent } from '../components/DeckOpponent'
import { Board } from '../components/Board'
import { Card } from '../types'
import { delay, isFlushValid } from '../utils'
import { chooseInitCard, chooseReactCard, getCurrentLoser } from '../gameplay'

const OPPONENTS_COUNT = 3

interface GameProps {
	playerNames: string[]
}

export const Game = ({ playerNames }: GameProps) => {
	const dispatch = useAppDispatch()
	const { cards, boardCards, cardsOut } = useAppSelector(selectCards)
	// Zda hrac muze provest akci
	const [canHeroAct, setCanHeroAct] = useState(true)
	const [initPlayer, setInitPlayer] = useState(0)
	const [currentLoser, setCurrentLoser] = useState<null | number>(null)
	const [round] = useState(0)
	const [currentScore, setCurrentScore] = useState(
		new Map([
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		])
	)

	const allOpponentsInit = useCallback(
		async (initPlayerIndex: number) => {
			// calculates villains count to act
			const opponentsToAct = OPPONENTS_COUNT - initPlayerIndex
			const card = chooseInitCard(initPlayerIndex, cards, boardCards, cardsOut)
			dispatch(removeCard({ playerIndex: initPlayerIndex, card }))

			// forces opponents to make their initializing moves
			for (let i = 1; i < opponentsToAct; i++) {
				// editting their order based on the initilizing player
				const marginIndex = (i + initPlayerIndex) % 4
				await delay()
				const card = chooseReactCard(
					marginIndex,
					cards,
					boardCards,
					cardsOut,
					initPlayer
				)
				dispatch(removeCard({ playerIndex: marginIndex, card }))
			}
			setCanHeroAct(true)
		},
		[dispatch, initPlayer]
	)

	// Reakce protihracu
	async function allOpponentsReact() {
		const opponentsToReact = [0, 1, 2].slice(0, initPlayer)
		for (const i of opponentsToReact) {
			await delay()
			const card = chooseReactCard(i, cards, boardCards, cardsOut, initPlayer)
			dispatch(removeCard({ playerIndex: i, card }))
		}
	}

	// MOUNT
	useEffect(() => {
		// Inicializace karet
		dispatch(shuffleCards())

		// Vynos protihracu
		allOpponentsInit(round)
	}, [dispatch, allOpponentsInit, round])

	// Tah hrace
	async function handleHeroClick(card: Card) {
		// Akce zakazana
		if (!canHeroAct) return

		const heroCards = cards[3]
		const initCard = boardCards[initPlayer]
		// Pokud hrac neprizna barvu => return
		if (initPlayer !== 3 && !isFlushValid(card, heroCards, initCard)) return

		// Odstrani danou kartu z hracova balicku a priradi do boardu
		dispatch(removeCard({ playerIndex: 3, card }))
		// Pozastavi moznost akce hrace
		setCanHeroAct(false)
		await allOpponentsReact()
		const loserIndex = getCurrentLoser(boardCards, initPlayer)
		// Nastavi aktualniho losera
		setCurrentLoser(loserIndex)
		// Nastavi vynasejiciho hrace
		setInitPlayer(loserIndex)
		setCurrentScore(score => {
			const scoreToUpdate = score.get(loserIndex) ?? 0
			score.set(loserIndex, scoreToUpdate + 1)
			return score
		})
		await delay(2000)
		// Vymaze karty z boardu
		dispatch(clearBoard())

		// konec hry
		if (heroCards.length === 1) {
			dispatch(shuffleCards())
			setInitPlayer(round)
			setCurrentLoser(null)
			if (round === 3) {
				setCanHeroAct(true)
			} else {
				allOpponentsInit(round)
			}
			return
		}

		if (loserIndex === 3) {
			// Opetovne umozni moznost akce hrace
			setCanHeroAct(true)
		} else {
			// Vynos protihracu
			allOpponentsInit(loserIndex)
		}
	}

	return (
		<div className="game-area">
			<div className="opponents-wrapper">
				{[0, 1, 2].map(index => (
					<DeckOpponent
						key={index}
						playerNames={playerNames}
						opponentIndex={index}
						initPlayer={initPlayer}
						currentScore={currentScore}
					/>
				))}
			</div>
			<Board currentLoser={currentLoser} />
			<DeckHero
				currentHeroScore={currentScore.get(3) ?? 0}
				initPlayer={initPlayer}
				onClick={handleHeroClick}
			/>
		</div>
	)
}
