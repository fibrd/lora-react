import { Card } from '../types'
import { RootState } from '../store/store'
import { sortBy } from 'lodash'
import { CardsState } from '../store/slices/cardsSlice'

// Vybere nejvyssi kartu z vyfiltrovaneho serazeneho balicku
function getTheHighestCard(deck: Card[]): Card {
	let index = 0
	const highestCards = deck.filter(c => c.value === deck[deck.length - 1].value)
	if (highestCards.length > 1) {
		const lowestFlushCards = highestCards.map((hc, idx) => {
			const flushCard = deck.find(c => c.flush === hc.flush)
			return { value: flushCard?.value ?? 0, index: idx }
		})

		const lowestFlushCard = lowestFlushCards.reduce(
			(acc, curr) =>
				curr.value > acc.value ? { value: curr.value, index: curr.index } : acc,
			{ value: 0, index: 0 }
		)
		index = lowestFlushCard.index
	}

	return highestCards[index]
}

// Vyfiltruje karty shodne s barvou vynosu
function filterFlushCards(deck: Card[], initCard: Card): Card[] {
	return deck.filter(c => c.flush === initCard.flush)
}

// Zkontroluje, zda je v balicku stejna barva nejnizsi hodnoty (= karta je chranena)
function isProtectedByOtherLowCard(
	card: Card,
	deck: Card[],
	boardCards: Card[],
	cardsOut: Card[]
): boolean {
	const sameFlushCardsInDeck = deck.filter(c => c.flush === card.flush)
	const sevenInDeck = sameFlushCardsInDeck.find(c => c.value === 0)
	let sameFlushCardsOutDeck = [...boardCards, ...cardsOut].filter(
		c => c.flush === card.flush
	)
	sameFlushCardsOutDeck = sortBy(sameFlushCardsOutDeck, ['value'])
	return (
		!!sevenInDeck ||
		(sameFlushCardsOutDeck.length > 0 &&
			sameFlushCardsInDeck[0].value < sameFlushCardsOutDeck[0].value)
	)
}

// Zkontroluje, zda neni dana barva uz zcela ze hry
function isFlushOut(
	flush: number,
	deck: Card[],
	boardCards: Card[],
	cardsOut: Card[]
): boolean {
	const flushCardsOut = cardsOut.filter(c => c.flush === flush).length
	const flushPlayerCards = deck.filter(c => c.flush === flush).length
	const flushBoardCards = boardCards.filter(c => c.flush === flush).length
	return flushCardsOut + flushPlayerCards + flushBoardCards === 8
}

// Zda je karta v balicku vysoka plonkova
function isHighPlonk(card: Card, deck: Card[]): boolean {
	// Nizsi nez 10ka
	if (card.value < 3) {
		return false
	}
	const flushPlayerCards = deck.filter(c => c.flush === card.flush)
	return flushPlayerCards.length === 1
}

// Priznani barvy
function chooseFilteredCard(
	deck: Card[],
	initCard: Card,
	boardCards: Card[]
): Card {
	// Vyfiltruje karty na boardu stejne barvy jako je vynos
	const filteredBoardCards = filterFlushCards(boardCards, initCard)
	// Vybere nejvyssi aktualni kartu na boardu
	const highestBoardCard = filteredBoardCards.reduce(
		(acc, curr) => (curr.value > acc.value ? curr : acc),
		initCard
	)
	// Vyfiltruje vsechny karty v balicku, ktere jsou hodnotou nizsi nez nejvyssi karta na boardu
	const lowerCards = deck.filter(c => c.value < highestBoardCard.value)
	// Pokud existuji nizsi karty v balicku, vybere nejvyssi z nich
	if (lowerCards.length > 0) {
		return lowerCards[lowerCards.length - 1]
		// Pokud nema zadne nizsi karty a je posledni na tahu, vybere nejvyssi kartu
	} else if (boardCards.length === 3) {
		return deck[deck.length - 1]
	}
	// Pokud nema zadne nizsi karty a neni posledni na tahu, vybere nejnizsi moznou kartu
	return deck[0]
}

// Odmazani ciziny
function chooseUnfilteredCard(
	deck: Card[],
	boardCards: Card[],
	cardsOut: Card[]
): Card {
	let wrongCards = [...deck]
	// Vyfiltruje nevhodne karty, kterych se treba zbavit (barvy souperu jeste nejsou ze hry)
	const wrongActiveCards = wrongCards.filter(
		c => !isFlushOut(c.flush, wrongCards, boardCards, cardsOut)
	)
	// Pokud existuji nevhodne karty, vybere se nejvyssi z nich
	if (wrongActiveCards.length > 0) {
		wrongCards = wrongActiveCards
	}

	// Vyfiltruje nevhodne karty, kterych se treba zbavit (nejsou chraneny nejnizsi kartou stejne barvy)
	const notProtectedByOtherLowCard = wrongCards.filter(
		c => !isProtectedByOtherLowCard(c, wrongCards, boardCards, cardsOut)
	)
	if (notProtectedByOtherLowCard.length > 0) {
		wrongCards = notProtectedByOtherLowCard
	}

	// Vyfiltruje plonkove karty s hodnotou 10 a vyssi
	const highPlonkCards = wrongCards.filter(c => isHighPlonk(c, wrongCards))
	if (highPlonkCards.length > 0) {
		return highPlonkCards[highPlonkCards.length - 1]
	}
	// Vybere se nejvyssi karta z balicku
	return getTheHighestCard(wrongCards)
}

export function chooseInitCard(playerIndex: number, state: RootState) {
	const { cards, boardCards, cardsOut } = state.cards
	const playerCards = cards[playerIndex]
	// Seradi karty vzestupne podle jejich hodnoty
	const sortedDeck = sortBy(playerCards, ['value'])

	let i = 0
	let card = sortedDeck[i]
	while (
		isFlushOut(card.flush, sortedDeck, boardCards, cardsOut) &&
		i < sortedDeck.length
	) {
		card = sortedDeck[i++]
	}
	return card
}

export function chooseReactCard(playerIndex: number, state: RootState) {
	const { cards, boardCards, cardsOut } = state.cards
	const { initPlayer } = state.game
	// Karta vynosu
	const initCard = boardCards[initPlayer]
	// Aktualni karty na boaru
	const activeBoardCards = boardCards.filter(c => !!c)

	const playerCards = cards[playerIndex]
	// Seradi karty vzestupne podle jejich hodnoty
	const sortedDeck = sortBy(playerCards, ['value'])
	// Vyfiltruje karty shodne s barvou vynosu
	const filteredDeck = filterFlushCards(sortedDeck, initCard)

	if (filteredDeck.length > 0) {
		return chooseFilteredCard(filteredDeck, initCard, activeBoardCards)
	}
	// Pokud se v balicku vubec nenachazi kata barvy shodne s barvou vynosu
	return chooseUnfilteredCard(sortedDeck, activeBoardCards, cardsOut)
}

export function getCurrentLoser(
	boardCards: Card[],
	initPlayer: number
): number {
	// Karta vynosu
	const initCard = boardCards[initPlayer]

	const boardEligable = boardCards.filter(c => c.flush === initCard.flush)
	// ziska nejvyssi hodnotu na boardu
	const boardMaxValue = Math.max(...boardEligable.map(c => c.value))

	const highestBoardCard = boardEligable.find(
		c => c.value === boardMaxValue
	) as Card

	return boardCards.findIndex(c => c.id === highestBoardCard.id)
}
