import React from 'react';
import styles from './NewGameButton.module.scss';

interface NewGameButtonProps {
	onNewGame: () => void;
	style?: React.CSSProperties;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onNewGame, style }) => {
	return (
		<button className={styles.newGameButton} onClick={onNewGame} style={style}>
			New Game
		</button>
	);
};

export default NewGameButton;
