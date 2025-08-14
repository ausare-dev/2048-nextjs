import React from 'react';
import styles from './NewGameButton.module.scss';

interface NewGameButtonProps {
	onNewGame: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onNewGame }) => {
	return (
		<button className={styles.newGameButton} onClick={onNewGame}>
			New Game
		</button>
	);
};

export default NewGameButton;
