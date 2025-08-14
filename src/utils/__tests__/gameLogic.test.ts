import {
	initializeBoard,
	addNewTile,
	move,
	isGameOver,
	BoardStateType,
	Direction,
} from '../gameLogic';

describe('gameLogic', () => {
	describe('initializeBoard', () => {
		it('should create a 4x4 board with 2 tiles', () => {
			const board = initializeBoard();

			expect(board).toHaveLength(4);
			expect(board[0]).toHaveLength(4);

			// Count non-null tiles
			let tileCount = 0;
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (board[row][col].value !== null) {
						tileCount++;
					}
				}
			}
			expect(tileCount).toBe(2);
		});

		it('should have tiles with values 2 or 4', () => {
			const board = initializeBoard();
			let maxValue = 0;

			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (board[row][col].value && board[row][col].value! > maxValue) {
						maxValue = board[row][col].value!;
					}
				}
			}

			expect(maxValue).toBeLessThanOrEqual(4);
			expect(maxValue).toBeGreaterThanOrEqual(2);
		});
	});

	describe('addNewTile', () => {
		it('should add a new tile to empty board', () => {
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

			let emptyTilesBefore = 0;
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (board[row][col].value === null) {
						emptyTilesBefore++;
					}
				}
			}

			addNewTile(board);

			let emptyTilesAfter = 0;
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (board[row][col].value === null) {
						emptyTilesAfter++;
					}
				}
			}

			expect(emptyTilesAfter).toBe(emptyTilesBefore - 1);
		});
	});

	describe('move', () => {
		it('should move tiles left correctly', () => {
			const board: BoardStateType = [
				[
					{
						value: 2,
						merged: false,
						isNew: false,
						id: '1',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: 2,
						merged: false,
						isNew: false,
						id: '2',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
				],
				[
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
				],
				[
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
				],
				[
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
				],
			];

			const result = move(board, 'left');

			expect(result.moved).toBe(true);
			expect(result.score).toBe(4); // 2 + 2 = 4
			expect(board[0][0].value).toBe(4);
			expect(board[0][0].merged).toBe(true);
			expect(board[0][1].value).toBe(null);
			expect(board[0][2].value).toBe(null);
		});

		it('should not move when no movement is possible', () => {
			const board: BoardStateType = [
				[
					{
						value: 2,
						merged: false,
						isNew: false,
						id: '1',
						direction: undefined,
					},
					{
						value: 4,
						merged: false,
						isNew: false,
						id: '2',
						direction: undefined,
					},
					{
						value: 8,
						merged: false,
						isNew: false,
						id: '3',
						direction: undefined,
					},
					{
						value: 16,
						merged: false,
						isNew: false,
						id: '4',
						direction: undefined,
					},
				],
				[
					{
						value: 32,
						merged: false,
						isNew: false,
						id: '5',
						direction: undefined,
					},
					{
						value: 64,
						merged: false,
						isNew: false,
						id: '6',
						direction: undefined,
					},
					{
						value: 128,
						merged: false,
						isNew: false,
						id: '7',
						direction: undefined,
					},
					{
						value: 256,
						merged: false,
						isNew: false,
						id: '8',
						direction: undefined,
					},
				],
				[
					{
						value: 512,
						merged: false,
						isNew: false,
						id: '9',
						direction: undefined,
					},
					{
						value: 1024,
						merged: false,
						isNew: false,
						id: '10',
						direction: undefined,
					},
					{
						value: 2048,
						merged: false,
						isNew: false,
						id: '11',
						direction: undefined,
					},
					{
						value: 4096,
						merged: false,
						isNew: false,
						id: '12',
						direction: undefined,
					},
				],
				[
					{
						value: 8192,
						merged: false,
						isNew: false,
						id: '13',
						direction: undefined,
					},
					{
						value: 16384,
						merged: false,
						isNew: false,
						id: '14',
						direction: undefined,
					},
					{
						value: 32768,
						merged: false,
						isNew: false,
						id: '15',
						direction: undefined,
					},
					{
						value: 65536,
						merged: false,
						isNew: false,
						id: '16',
						direction: undefined,
					},
				],
			];

			const result = move(board, 'left');

			expect(result.moved).toBe(false);
			expect(result.score).toBe(0);
		});
	});

	describe('isGameOver', () => {
		it('should return false for board with empty tiles', () => {
			const board: BoardStateType = [
				[
					{
						value: 2,
						merged: false,
						isNew: false,
						id: '1',
						direction: undefined,
					},
					{
						value: 4,
						merged: false,
						isNew: false,
						id: '2',
						direction: undefined,
					},
					{
						value: 8,
						merged: false,
						isNew: false,
						id: '3',
						direction: undefined,
					},
					{
						value: 16,
						merged: false,
						isNew: false,
						id: '4',
						direction: undefined,
					},
				],
				[
					{
						value: 32,
						merged: false,
						isNew: false,
						id: '5',
						direction: undefined,
					},
					{
						value: 64,
						merged: false,
						isNew: false,
						id: '6',
						direction: undefined,
					},
					{
						value: 128,
						merged: false,
						isNew: false,
						id: '7',
						direction: undefined,
					},
					{
						value: 256,
						merged: false,
						isNew: false,
						id: '8',
						direction: undefined,
					},
				],
				[
					{
						value: 512,
						merged: false,
						isNew: false,
						id: '9',
						direction: undefined,
					},
					{
						value: 1024,
						merged: false,
						isNew: false,
						id: '10',
						direction: undefined,
					},
					{
						value: 2048,
						merged: false,
						isNew: false,
						id: '11',
						direction: undefined,
					},
					{
						value: null,
						merged: false,
						isNew: false,
						id: '',
						direction: undefined,
					},
				],
				[
					{
						value: 8192,
						merged: false,
						isNew: false,
						id: '13',
						direction: undefined,
					},
					{
						value: 16384,
						merged: false,
						isNew: false,
						id: '14',
						direction: undefined,
					},
					{
						value: 32768,
						merged: false,
						isNew: false,
						id: '15',
						direction: undefined,
					},
					{
						value: 65536,
						merged: false,
						isNew: false,
						id: '16',
						direction: undefined,
					},
				],
			];

			expect(isGameOver(board)).toBe(false);
		});

		it('should return true for full board with no possible merges', () => {
			const board: BoardStateType = [
				[
					{
						value: 2,
						merged: false,
						isNew: false,
						id: '1',
						direction: undefined,
					},
					{
						value: 4,
						merged: false,
						isNew: false,
						id: '2',
						direction: undefined,
					},
					{
						value: 8,
						merged: false,
						isNew: false,
						id: '3',
						direction: undefined,
					},
					{
						value: 16,
						merged: false,
						isNew: false,
						id: '4',
						direction: undefined,
					},
				],
				[
					{
						value: 32,
						merged: false,
						isNew: false,
						id: '5',
						direction: undefined,
					},
					{
						value: 64,
						merged: false,
						isNew: false,
						id: '6',
						direction: undefined,
					},
					{
						value: 128,
						merged: false,
						isNew: false,
						id: '7',
						direction: undefined,
					},
					{
						value: 256,
						merged: false,
						isNew: false,
						id: '8',
						direction: undefined,
					},
				],
				[
					{
						value: 512,
						merged: false,
						isNew: false,
						id: '9',
						direction: undefined,
					},
					{
						value: 1024,
						merged: false,
						isNew: false,
						id: '10',
						direction: undefined,
					},
					{
						value: 2048,
						merged: false,
						isNew: false,
						id: '11',
						direction: undefined,
					},
					{
						value: 4096,
						merged: false,
						isNew: false,
						id: '12',
						direction: undefined,
					},
				],
				[
					{
						value: 8192,
						merged: false,
						isNew: false,
						id: '13',
						direction: undefined,
					},
					{
						value: 16384,
						merged: false,
						isNew: false,
						id: '14',
						direction: undefined,
					},
					{
						value: 32768,
						merged: false,
						isNew: false,
						id: '15',
						direction: undefined,
					},
					{
						value: 65536,
						merged: false,
						isNew: false,
						id: '16',
						direction: undefined,
					},
				],
			];

			expect(isGameOver(board)).toBe(true);
		});
	});
});
