import React from 'react';
import styles from './ScoreCounter.module.scss';

interface ScoreCounterProps {
	score: number;
	style?: React.CSSProperties;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score, style }) => {
	return (
		<div className={styles.scoreCounter} style={style}>
			<div className={styles.label}>Score</div>
			<div className={styles.value}>{score}</div>
		</div>
	);
};

export default ScoreCounter;
