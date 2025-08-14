import React from 'react';
import ScoreCounter from '../ScoreCounter/ScoreCounter';
import BestScore from '../BestScore/BestScore';
import NewGameButton from '../NewGameButton/NewGameButton';
import styles from './RightPanel.module.scss';
import { Theme } from '../ThemeSelector/ThemeSelector';
import { useThemeStyles } from '../../hooks/useThemeStyles';

interface RightPanelProps {
	score: number;
	bestScore: number;
	onNewGame: () => void;
	currentTheme: string;
}

const RightPanel: React.FC<RightPanelProps> = ({
	score,
	bestScore,
	onNewGame,
	currentTheme,
}) => {
	const themeStyles = useThemeStyles(currentTheme);
	return (
		<div className={styles.rightPanel}>
			<div className={styles.scores}>
				<ScoreCounter
					score={score}
					style={{
						background: themeStyles.colors.scoreCounter,
						borderColor: themeStyles.colors.scoreCounterBorder,
					}}
				/>
				<BestScore
					bestScore={bestScore}
					style={{
						background: themeStyles.colors.bestScore,
						borderColor: themeStyles.colors.bestScoreBorder,
					}}
				/>
			</div>
			<NewGameButton
				onNewGame={onNewGame}
				style={{
					background: themeStyles.colors.newGameButton,
					borderColor: themeStyles.colors.newGameButtonBorder,
				}}
			/>
		</div>
	);
};

export default RightPanel;
