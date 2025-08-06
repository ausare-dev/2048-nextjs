import { useEffect, useRef } from 'react';
import { Direction } from './gameLogic';

interface SwipeConfig {
	threshold?: number;
	restraint?: number;
	allowedTime?: number;
}

export const useSwipe = (
	onSwipe: (direction: Direction) => void,
	config: SwipeConfig = {}
) => {
	const { threshold = 50, restraint = 100, allowedTime = 500 } = config;
	const startX = useRef<number>(0);
	const startY = useRef<number>(0);
	const startTime = useRef<number>(0);

	useEffect(() => {
		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0];
			startX.current = touch.clientX;
			startY.current = touch.clientY;
			startTime.current = Date.now();
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const touch = e.changedTouches[0];
			const distX = touch.clientX - startX.current;
			const distY = touch.clientY - startY.current;
			const elapsedTime = Date.now() - startTime.current;

			if (elapsedTime <= allowedTime) {
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
					// Horizontal swipe
					if (distX > 0) {
						onSwipe('right');
					} else {
						onSwipe('left');
					}
				} else if (
					Math.abs(distY) >= threshold &&
					Math.abs(distX) <= restraint
				) {
					// Vertical swipe
					if (distY > 0) {
						onSwipe('down');
					} else {
						onSwipe('up');
					}
				}
			}
		};

		document.addEventListener('touchstart', handleTouchStart, {
			passive: true,
		});
		document.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [onSwipe, threshold, restraint, allowedTime]);
};
