export type BoardType = (number | null)[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export function initializeBoard(): BoardType {
	const board: BoardType = Array(4)
		.fill(null)
		.map(() => Array(4).fill(null));
	addNewTile(board);
	addNewTile(board);
	return board;
}

export function addNewTile(board: BoardType): void {
	const emptyTiles: { row: number; col: number }[] = [];

	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			if (board[row][col] === null) {
				emptyTiles.push({ row, col });
			}
		}
	}

	if (emptyTiles.length > 0) {
		const { row, col } =
			emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
		board[row][col] = Math.random() < 0.9 ? 2 : 4;
	}
}

export function move(board: BoardType, direction: Direction): boolean {
	let moved = false;
	const merged = Array(4)
		.fill(null)
		.map(() => Array(4).fill(false));

	const slideOrMerge = (
		fromRow: number,
		fromCol: number,
		toRow: number,
		toCol: number
	) => {
		if (board[toRow][toCol] === null) {
			board[toRow][toCol] = board[fromRow][fromCol];
			board[fromRow][fromCol] = null;
			moved = true;
		} else if (
			board[toRow][toCol] === board[fromRow][fromCol] &&
			!merged[toRow][toCol]
		) {
			board[toRow][toCol]! *= 2;
			board[fromRow][fromCol] = null;
			merged[toRow][toCol] = true;
			moved = true;
		}
	};

	const processDirection = (direction: Direction) => {
		if (direction === 'up' || direction === 'down') {
			for (let col = 0; col < 4; col++) {
				const range = direction === 'up' ? [0, 4, 1] : [3, -1, -1];
				for (let row = range[0]; row !== range[1]; row += range[2]) {
					if (board[row][col] !== null) {
						let newRow = row;
						let newCol = col;

						while (true) {
							const nextRow = newRow + (direction === 'up' ? -1 : 1);
							if (nextRow < 0 || nextRow >= 4) break;

							if (board[nextRow][col] === null) {
								slideOrMerge(newRow, newCol, nextRow, col);
								newRow = nextRow;
							} else if (
								board[nextRow][col] === board[newRow][col] &&
								!merged[nextRow][col]
							) {
								slideOrMerge(newRow, newCol, nextRow, col);
								break;
							} else {
								break;
							}
						}
					}
				}
			}
		} else {
			for (let row = 0; row < 4; row++) {
				const range = direction === 'left' ? [0, 4, 1] : [3, -1, -1];
				for (let col = range[0]; col !== range[1]; col += range[2]) {
					if (board[row][col] !== null) {
						let newRow = row;
						let newCol = col;

						while (true) {
							const nextCol = newCol + (direction === 'left' ? -1 : 1);
							if (nextCol < 0 || nextCol >= 4) break;

							if (board[row][nextCol] === null) {
								slideOrMerge(newRow, newCol, row, nextCol);
								newCol = nextCol;
							} else if (
								board[row][nextCol] === board[row][newCol] &&
								!merged[row][nextCol]
							) {
								slideOrMerge(newRow, newCol, row, nextCol);
								break;
							} else {
								break;
							}
						}
					}
				}
			}
		}
	};

	processDirection(direction);
	return moved;
}

export function isGameOver(board: BoardType): boolean {
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			if (board[row][col] === null) return false;
			if (row > 0 && board[row][col] === board[row - 1][col]) return false;
			if (col > 0 && board[row][col] === board[row][col - 1]) return false;
		}
	}
	return true;
}
