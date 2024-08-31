import React from 'react'
import styles from './Tile.module.scss'

interface TileProps {
	tile: number | null;
}

const Tile: React.FC<TileProps> = ({tile }) => {
	return (
		<div  className={styles.tile}>
			{tile}
		</div>
	);
};

export default Tile
