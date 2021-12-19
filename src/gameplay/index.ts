import { Card } from '../types'

// filtering players cards w/ the same flush
function filterFlushCards(deck: Card[], initCard: Card) {
	return deck.filter(c => c.flush === initCard.flush)
}

export function chooseCard(sortedDeck: Card[], initCard: Card) {
	const filteredDeck = filterFlushCards(sortedDeck, initCard)
	return filteredDeck[0] || sortedDeck[0]
}
