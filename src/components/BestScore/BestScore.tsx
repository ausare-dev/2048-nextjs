import React from 'react';
import styles from './BestScore.module.scss';

interface BestScoreProps {
	bestScore: number;
	style?: React.CSSProperties;
}

const BestScore: React.FC<BestScoreProps> = ({ bestScore, style }) => {
	return (
		<div className={styles.bestScore} style={style}>
			<div className={styles.label}>Best Score</div>
			<div className={styles.value}>{bestScore}</div>
		</div>
	);
};

export default BestScore;
