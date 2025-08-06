export type BoardType = (number | null)[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface TileState {
	value: number | null;
	merged: boolean;
	isNew: boolean;
	id: string;
	direction?: Direction; // Добавляем направление движения
}

export type BoardStateType = TileState[][];

let tileIdCounter = 0;

export function initializeBoard(): BoardStateType {
	const board: BoardStateType = Array(4)
		.fill(null)
		.map(() =>
			Array(4)
				.fill(null)
				.map(() => ({
					value: null,
					merged: false,
					isNew: false,
					id: '',
					direction: undefined,
				}))
		);
	addNewTile(board);
	addNewTile(board);
	return board;
}

export function addNewTile(board: BoardStateType): void {
	const emptyTiles: { row: number; col: number }[] = [];

	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			if (board[row][col].value === null) {
				emptyTiles.push({ row, col });
			}
		}
	}

	if (emptyTiles.length > 0) {
		const { row, col } =
			emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
		board[row][col] = {
			value: Math.random() < 0.9 ? 2 : 4,
			merged: false,
			isNew: true,
			id: `tile-${++tileIdCounter}`,
			direction: undefined,
		};
	}
}

export function move(
	board: BoardStateType,
	direction: Direction
): { moved: boolean; score: number } {
	let moved = false;
	let score = 0;

	// Сброс состояний и установка направления для всех плиток
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			board[row][col].merged = false;
			board[row][col].isNew = false;
			board[row][col].direction = direction; // Устанавливаем направление для анимации
		}
	}

	const merged = Array(4)
		.fill(null)
		.map(() => Array(4).fill(false));

	const slideOrMerge = (
		fromRow: number,
		fromCol: number,
		toRow: number,
		toCol: number
	) => {
		if (board[toRow][toCol].value === null) {
			// Простое движение плитки
			board[toRow][toCol] = { ...board[fromRow][fromCol], direction };
			board[fromRow][fromCol] = {
				value: null,
				merged: false,
				isNew: false,
				id: '',
				direction: undefined,
			};
			moved = true;
		} else if (
			board[toRow][toCol].value === board[fromRow][fromCol].value &&
			!merged[toRow][toCol]
		) {
			// Слияние плиток
			board[toRow][toCol].value! *= 2;
			board[toRow][toCol].merged = true;
			board[toRow][toCol].direction = direction;
			board[toRow][toCol].id = board[fromRow][fromCol].id; // Сохраняем ID для анимации
			score += board[toRow][toCol].value!;
			board[fromRow][fromCol] = {
				value: null,
				merged: false,
				isNew: false,
				id: '',
				direction: undefined,
			};
			merged[toRow][toCol] = true;
			moved = true;
		}
	};

	const processDirection = (direction: Direction) => {
		if (direction === 'up' || direction === 'down') {
			for (let col = 0; col < 4; col++) {
				const range = direction === 'up' ? [0, 4, 1] : [3, -1, -1];
				for (let row = range[0]; row !== range[1]; row += range[2]) {
					if (board[row][col].value !== null) {
						let newRow = row;
						let newCol = col;

						while (true) {
							const nextRow = newRow + (direction === 'up' ? -1 : 1);
							if (nextRow < 0 || nextRow >= 4) break;

							if (board[nextRow][col].value === null) {
								slideOrMerge(newRow, newCol, nextRow, col);
								newRow = nextRow;
							} else if (
								board[nextRow][col].value === board[newRow][col].value &&
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
					if (board[row][col].value !== null) {
						let newRow = row;
						let newCol = col;

						while (true) {
							const nextCol = newCol + (direction === 'left' ? -1 : 1);
							if (nextCol < 0 || nextCol >= 4) break;

							if (board[row][nextCol].value === null) {
								slideOrMerge(newRow, newCol, row, nextCol);
								newCol = nextCol;
							} else if (
								board[row][nextCol].value === board[row][newCol].value &&
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

	// Сбрасываем направление через небольшую задержку для следующего хода
	setTimeout(() => {
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				board[row][col].direction = undefined;
			}
		}
	}, 300);

	return { moved, score };
}

export function isGameOver(board: BoardStateType): boolean {
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			if (board[row][col].value === null) return false;
			if (row > 0 && board[row][col].value === board[row - 1][col].value)
				return false;
			if (col > 0 && board[row][col].value === board[row][col - 1].value)
				return false;
		}
	}
	return true;
}
