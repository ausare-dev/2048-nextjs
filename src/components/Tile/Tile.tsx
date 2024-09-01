import React from 'react'
import styles from './Tile.module.scss'

interface TileProps {
	tile: number | null;
	
}

const Tile: React.FC<TileProps> = ({tile}) => {
	const getGifForTile = (value: number | null): string => {
		if (value === null) {
			return '';
		}
		return `/images/${value}.gif`;
	};

	return (
		<div className={styles.tile}>
				<img className={styles.img} src={getGifForTile(tile)} alt={`Tile ${tile}`} />
		</div>
	);
};

export default Tile
