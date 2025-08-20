export interface Theme {
	id: string;
	name: string;
	colors: {
		background: string;
		board: string;
		boardBorder: string;
		emptyTile: string;
		emptyTileBorder: string;
		title: string;
		scoreCounter: string;
		scoreCounterBorder: string;
		bestScore: string;
		bestScoreBorder: string;
		newGameButton: string;
		newGameButtonBorder: string;
	};
}

// Centralized theme map (source of truth)
export const themesMap: { [key: string]: Theme } = {
	gif: {
		id: 'gif',
		name: 'Base',
		colors: {
			background: '#57407c',
			board: 'transparent',
			boardBorder: '#6b46c1',
			emptyTile: '#3d2963',
			emptyTileBorder: 'transparent',
			title: '#ffffff',
			scoreCounter: 'linear-gradient(135deg, #6b46c1 0%, #805ad5 100%)',
			scoreCounterBorder: '#9f7aea',
			bestScore: 'linear-gradient(135deg, #3182ce 0%, #4299e1 100%)',
			bestScoreBorder: '#63b3ed',
			newGameButton: 'linear-gradient(135deg, #6b46c1 0%, #805ad5 100%)',
			newGameButtonBorder: '#9f7aea',
		},
	},
	neon: {
		id: 'neon',
		name: 'Neon',
		colors: {
			background: '#0f0f23',
			board: '#1a1a2e',
			boardBorder: '#00d4ff',
			emptyTile: '#10183e',
			emptyTileBorder: '#00d4ff',
			title: '#00d4ff',
			scoreCounter: '#ff006e',
			scoreCounterBorder: '#ff006e',
			bestScore: '#0099cc',
			bestScoreBorder: '#00d4ff',
			newGameButton: '#ff006e',
			newGameButtonBorder: '#ff006e',
		},
	},
	sunset: {
		id: 'sunset',
		name: 'Sunset',
		colors: {
			background: '#ff9f43',
			board: '#feca57',
			boardBorder: '#ff6b6b',
			emptyTile: '#b470ab',
			emptyTileBorder: '#ff6b6b',
			title: '#ffffff',
			scoreCounter: '#ee5a24',
			scoreCounterBorder: '#ff6b6b',
			bestScore: '#feca57',
			bestScoreBorder: '#feca57',
			newGameButton: '#ee5a24',
			newGameButtonBorder: '#ff6b6b',
		},
	},
	forest: {
		id: 'forest',
		name: 'Forest',
		colors: {
			background: '#2d5016',
			board: '#4a7c59',
			boardBorder: '#2d5016',
			emptyTile: '#496119',
			emptyTileBorder: '#2d5016',
			title: '#ffffff',
			scoreCounter: '#4a7c59',
			scoreCounterBorder: '#2d5016',
			bestScore: '#90ee90',
			bestScoreBorder: '#8fbc8f',
			newGameButton: '#4a7c59',
			newGameButtonBorder: '#2d5016',
		},
	},
	classic: {
		id: 'classic',
		name: 'Classic',
		colors: {
			background: '#faf8ef',
			board: '#bbada0',
			boardBorder: '#bbada0',
			emptyTile: '#cdc1b4',
			emptyTileBorder: '#bbada0',
			title: '#776e65',
			scoreCounter: '#bbada0',
			scoreCounterBorder: '#bbada0',
			bestScore: '#bbada0',
			bestScoreBorder: '#bbada0',
			newGameButton: '#8f7a66',
			newGameButtonBorder: '#8f7a66',
		},
	},
};

export const themesArray: Theme[] = Object.values(themesMap);
