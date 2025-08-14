import React from 'react';
import styles from './ThemeSelector.module.scss';

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

interface ThemeSelectorProps {
	currentTheme: string;
	onThemeChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
	currentTheme,
	onThemeChange,
}) => {
	const themes: Theme[] = [
		{
			id: 'gif',
			name: 'GIF Theme',
			colors: {
				background:
					'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)',
				board: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
				boardBorder: '#6b46c1',
				emptyTile: 'linear-gradient(135deg, #4a5568 0%, #718096 100%)',
				emptyTileBorder: '#6b46c1',
				title: '#ffffff',
				scoreCounter: 'linear-gradient(135deg, #6b46c1 0%, #805ad5 100%)',
				scoreCounterBorder: '#9f7aea',
				bestScore: 'linear-gradient(135deg, #3182ce 0%, #4299e1 100%)',
				bestScoreBorder: '#63b3ed',
				newGameButton: 'linear-gradient(135deg, #6b46c1 0%, #805ad5 100%)',
				newGameButtonBorder: '#9f7aea',
			},
		},
		{
			id: 'neon',
			name: 'Neon Theme',
			colors: {
				background:
					'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
				board: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
				boardBorder: '#00d4ff',
				emptyTile: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
				emptyTileBorder: '#00d4ff',
				title: '#00d4ff',
				scoreCounter: 'linear-gradient(135deg, #ff006e 0%, #ff6b6b 100%)',
				scoreCounterBorder: '#ff006e',
				bestScore: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
				bestScoreBorder: '#00d4ff',
				newGameButton: 'linear-gradient(135deg, #ff006e 0%, #ff6b6b 100%)',
				newGameButtonBorder: '#ff006e',
			},
		},
		{
			id: 'sunset',
			name: 'Sunset Theme',
			colors: {
				background:
					'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
				board: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
				boardBorder: '#ff6b6b',
				emptyTile: 'linear-gradient(135deg, #ff9ff3 0%, #feca57 100%)',
				emptyTileBorder: '#ff6b6b',
				title: '#ffffff',
				scoreCounter: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
				scoreCounterBorder: '#ff6b6b',
				bestScore: 'linear-gradient(135deg, #feca57 0%, #ff9f43 100%)',
				bestScoreBorder: '#feca57',
				newGameButton: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
				newGameButtonBorder: '#ff6b6b',
			},
		},
		{
			id: 'forest',
			name: 'Forest Theme',
			colors: {
				background:
					'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #6b8e23 100%)',
				board: 'linear-gradient(135deg, #4a7c59 0%, #6b8e23 100%)',
				boardBorder: '#2d5016',
				emptyTile: 'linear-gradient(135deg, #6b8e23 0%, #8fbc8f 100%)',
				emptyTileBorder: '#2d5016',
				title: '#ffffff',
				scoreCounter: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
				scoreCounterBorder: '#2d5016',
				bestScore: 'linear-gradient(135deg, #8fbc8f 0%, #90ee90 100%)',
				bestScoreBorder: '#8fbc8f',
				newGameButton: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
				newGameButtonBorder: '#2d5016',
			},
		},
	];

	return (
		<div className={styles.themeSelector}>
			<div className={styles.title}>Theme</div>
			<div className={styles.themes}>
				{themes.map(theme => (
					<button
						key={theme.id}
						className={`${styles.themeButton} ${
							currentTheme === theme.id ? styles.active : ''
						}`}
						onClick={() => onThemeChange(theme.id)}
						style={{
							background: theme.colors.scoreCounter,
							borderColor: theme.colors.scoreCounterBorder,
						}}
					>
						{theme.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default ThemeSelector;
