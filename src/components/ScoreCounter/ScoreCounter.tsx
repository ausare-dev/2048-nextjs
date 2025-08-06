import React from 'react';
import styles from './ScoreCounter.module.scss';

interface ScoreCounterProps {
	score: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score }) => {
	return (
		<div className={styles.scoreCounter}>
			<div className={styles.label}>Score</div>
			<div className={styles.value}>{score}</div>
		</div>
	);
};

export default ScoreCounter;
