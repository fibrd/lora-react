import { Card } from '../types'
import { RootState } from '../store/store'
import { sortBy } from 'lodash'

// Vyfiltruje karty shodne s barvou vynosu
function filterFlushCards(deck: Card[], initCard: Card): Card[] {
	return deck.filter(c => c.flush === initCard.flush)
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

function chooseFilteredCard(
	deck: Card[],
	initCard: Card,
	boardCards: Card[]
): Card {
	// Vyfiltruje karty stejne barvy jako je vynos
	const filteredBoardCards = boardCards.filter(c => c.flush === initCard.flush)
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

function chooseUnfilteredCard(
	deck: Card[],
	boardCards: Card[],
	cardsOut: Card[]
): Card {
	// Vyfiltruje nevhodne karty, kterych se treba zbavit
	const wrongCards = deck.filter(
		c => !isFlushOut(c.flush, deck, boardCards, cardsOut)
	)
	// Pokud existuji nevhodne karty, vybere se nejvyssi z nich
	if (wrongCards.length > 0) {
		return wrongCards[wrongCards.length - 1]
	}
	// Vybere se nejvyssi karta z balicku
	return deck[deck.length - 1]
}

export function chooseCard(playerIndex: number, state: RootState) {
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
