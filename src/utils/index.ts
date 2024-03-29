import { Card } from '../types'

// zajisti casove zdrzeni podle zadaneho parametru v ms
export function delay(delayTimeInMs = 100) {
	return new Promise<void>(resolve =>
		setTimeout(() => resolve(), delayTimeInMs)
	)
}

export function isFlushValid(
	card: Card,
	playerCards: Card[],
	initCard: Card
): boolean {
	// finds any player's card with flush equals to the initializing one
	const anyFlushCard = playerCards.find(c => c.flush === initCard.flush)
	return card.flush === initCard.flush || !anyFlushCard
}

// vrati pole karet pri inicializaci hry
export function getCards() {
	return [
		{
			id: 1,
			src: '/assets/cardsmini/7_c.jpg',
			name: '7c',
			value: 0,
			flush: 0,
		},
		{
			id: 2,
			src: '/assets/cardsmini/8_c.jpg',
			name: '8c',
			value: 1,
			flush: 0,
		},
		{
			id: 3,
			src: '/assets/cardsmini/9_c.jpg',
			name: '9c',
			value: 2,
			flush: 0,
		},
		{
			id: 4,
			src: '/assets/cardsmini/t_c.jpg',
			name: 'tc',
			value: 3,
			flush: 0,
		},
		{
			id: 5,
			src: '/assets/cardsmini/j_c.jpg',
			name: 'jc',
			value: 4,
			flush: 0,
		},
		{
			id: 6,
			src: '/assets/cardsmini/q_c.jpg',
			name: 'qc',
			value: 5,
			flush: 0,
		},
		{
			id: 7,
			src: '/assets/cardsmini/k_c.jpg',
			name: 'kc',
			value: 6,
			flush: 0,
		},
		{
			id: 8,
			src: '/assets/cardsmini/a_c.jpg',
			name: 'ac',
			value: 7,
			flush: 0,
		},
		{
			id: 9,
			src: '/assets/cardsmini/7_s.jpg',
			name: '7s',
			value: 0,
			flush: 1,
		},
		{
			id: 10,
			src: '/assets/cardsmini/8_s.jpg',
			name: '8s',
			value: 1,
			flush: 1,
		},
		{
			id: 11,
			src: '/assets/cardsmini/9_s.jpg',
			name: '9s',
			value: 2,
			flush: 1,
		},
		{
			id: 12,
			src: '/assets/cardsmini/t_s.jpg',
			name: 'ts',
			value: 3,
			flush: 1,
		},
		{
			id: 13,
			src: '/assets/cardsmini/j_s.jpg',
			name: 'js',
			value: 4,
			flush: 1,
		},
		{
			id: 14,
			src: '/assets/cardsmini/q_s.jpg',
			name: 'qs',
			value: 5,
			flush: 1,
		},
		{
			id: 15,
			src: '/assets/cardsmini/k_s.jpg',
			name: 'ks',
			value: 6,
			flush: 1,
		},
		{
			id: 16,
			src: '/assets/cardsmini/a_s.jpg',
			name: 'as',
			value: 7,
			flush: 1,
		},
		{
			id: 17,
			src: '/assets/cardsmini/7_d.jpg',
			name: '7d',
			value: 0,
			flush: 2,
		},
		{
			id: 18,
			src: '/assets/cardsmini/8_d.jpg',
			name: '8d',
			value: 1,
			flush: 2,
		},
		{
			id: 19,
			src: '/assets/cardsmini/9_d.jpg',
			name: '9d',
			value: 2,
			flush: 2,
		},
		{
			id: 20,
			src: '/assets/cardsmini/t_d.jpg',
			name: 'td',
			value: 3,
			flush: 2,
		},
		{
			id: 21,
			src: '/assets/cardsmini/j_d.jpg',
			name: 'jd',
			value: 4,
			flush: 2,
		},
		{
			id: 22,
			src: '/assets/cardsmini/q_d.jpg',
			name: 'qd',
			value: 5,
			flush: 2,
		},
		{
			id: 23,
			src: '/assets/cardsmini/k_d.jpg',
			name: 'kd',
			value: 6,
			flush: 2,
		},
		{
			id: 24,
			src: '/assets/cardsmini/a_d.jpg',
			name: 'ad',
			value: 7,
			flush: 2,
		},
		{
			id: 25,
			src: '/assets/cardsmini/7_h.jpg',
			name: '7h',
			value: 0,
			flush: 3,
		},
		{
			id: 26,
			src: '/assets/cardsmini/8_h.jpg',
			name: '8h',
			value: 1,
			flush: 3,
		},
		{
			id: 27,
			src: '/assets/cardsmini/9_h.jpg',
			name: '9h',
			value: 2,
			flush: 3,
		},
		{
			id: 28,
			src: '/assets/cardsmini/t_h.jpg',
			name: 'th',
			value: 3,
			flush: 3,
		},
		{
			id: 29,
			src: '/assets/cardsmini/j_h.jpg',
			name: 'jh',
			value: 4,
			flush: 3,
		},
		{
			id: 30,
			src: '/assets/cardsmini/q_h.jpg',
			name: 'qh',
			value: 5,
			flush: 3,
		},
		{
			id: 31,
			src: '/assets/cardsmini/k_h.jpg',
			name: 'kh',
			value: 6,
			flush: 3,
		},
		{
			id: 32,
			src: '/assets/cardsmini/a_h.jpg',
			name: 'ah',
			value: 7,
			flush: 3,
		},
	]
}

// pole vsech dostupnych jmen hracu
function getListOfNames() {
	return [
		'Adam',
		'Aleš',
		'Antonín',
		'Daniel',
		'David',
		'Filip',
		'František',
		'Ivo',
		'Jakub',
		'Jan',
		'Jaromír',
		'Jaroslav',
		'Jindřich',
		'Jiří',
		'Josef',
		'Kamil',
		'Karel',
		'Ladislav',
		'Libor',
		'Lubomír',
		'Luboš',
		'Luděk',
		'Lukáš',
		'Marek',
		'Martin',
		'Michal',
		'Milan',
		'Miroslav',
		'Oldřich',
		'Ondřej',
		'Patrik',
		'Pavel',
		'Petr',
		'Radek',
		'Radim',
		'Richard',
		'Robert',
		'Roman',
		'Stanislav',
		'Štěpán',
		'Tomáš',
		'Václav',
		'Viktor',
		'Vladimír',
		'Vlastimil',
		'Vojtěch',
		'Zdeněk',
		'Alan',
		'Alexandr',
		'Bedřich',
		'Bohdan',
		'Bohumil',
		'Bohumír',
		'Bohuslav',
		'Boris',
		'Bořivoj',
		'Břetislav',
		'Čeněk',
		'Dalibor',
		'Dan',
		'Dominik',
		'Drahomír',
		'Dušan',
		'Emil',
		'Erik',
		'Evžen',
		'Gustav',
		'Hynek',
		'Igor',
		'Ivan',
		'Julius',
		'Kryštof',
		'Leoš',
		'Lubor',
		'Ludvík',
		'Lumír',
		'Marcel',
		'Marián',
		'Matěj',
		'Miloslav',
		'Miloš',
		'Mirek',
		'Mojmír',
		'Nikola',
		'Ota',
		'Otakar',
		'Přemysl',
		'Radomír',
		'Radoslav',
		'Radovan',
		'René',
		'Robin',
		'Rostislav',
		'Rudolf',
		'Svatopluk',
		'Šimon',
		'Tibor',
		'Vilém',
		'Vít',
		'Vítězslav',
		'Vladan',
		'Vladislav',
		'Vlastislav',
		'Vratislav',
		'Zbyněk',
		'Zoltán',
		'Adéla',
		'Alena',
		'Andrea',
		'Anna',
		'Barbora',
		'Blanka',
		'Dagmar',
		'Dana',
		'Daniela',
		'Denisa',
		'Eliška',
		'Eva',
		'Gabriela',
		'Hana',
		'Helena',
		'Irena',
		'Iva',
		'Ivana',
		'Iveta',
		'Jana',
		'Jarmila',
		'Jaroslava',
		'Jiřina',
		'Jitka',
		'Kamila',
		'Karolína',
		'Kateřina',
		'Klára',
		'Kristýna',
		'Lenka',
		'Lucie',
		'Ludmila',
		'Magdaléna',
		'Marcela',
		'Marie',
		'Markéta',
		'Marta',
		'Martina',
		'Michaela',
		'Miroslava',
		'Monika',
		'Olga',
		'Pavla',
		'Petra',
		'Radka',
		'Romana',
		'Simona',
		'Soňa',
		'Šárka',
		'Tereza',
		'Věra',
		'Veronika',
		'Vladimíra',
		'Zdeňka',
		'Zuzana',
		'Žaneta',
		'Miloš Zeman',
	]
}

// vygeneruje pole tri nahodnych jmen hracu
export function getRandomNames(): string[] {
	const names = getListOfNames()
	const listNameLen = names.length
	const randomIndex1 = Math.floor(Math.random() * listNameLen)
	let randomIndex2 = Math.floor(Math.random() * listNameLen)
	// zajisti unikatnost daneho jmena hrace
	while (randomIndex2 === randomIndex1) {
		randomIndex2 = Math.floor(Math.random() * listNameLen)
	}

	let randomIndex3 = Math.floor(Math.random() * listNameLen)
	// zajisti unikatnost daneho jmena hrace
	while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2) {
		randomIndex3 = Math.floor(Math.random() * listNameLen)
	}
	return [names[randomIndex1], names[randomIndex2], names[randomIndex3]]
}
