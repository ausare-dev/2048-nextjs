import React from 'react';
import ScoreCounter from '../ScoreCounter/ScoreCounter';
import BestScore from '../BestScore/BestScore';
import NewGameButton from '../NewGameButton/NewGameButton';
import styles from './RightPanel.module.scss';

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
	return (
		<div className={styles.rightPanel}>
			<div className={styles.scores}>
				<ScoreCounter score={score} />
				<BestScore bestScore={bestScore} />
			</div>
			<NewGameButton onNewGame={onNewGame} />
		</div>
	);
};

export default RightPanel;
