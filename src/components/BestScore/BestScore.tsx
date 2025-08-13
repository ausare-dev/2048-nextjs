import React from 'react';
import styles from './BestScore.module.scss';

interface BestScoreProps {
	bestScore: number;
}

const BestScore: React.FC<BestScoreProps> = ({ bestScore }) => {
	return (
		<div className={styles.bestScore}>
			<div className={styles.label}>Best Score</div>
			<div className={styles.value}>{bestScore}</div>
		</div>
	);
};

export default BestScore;
