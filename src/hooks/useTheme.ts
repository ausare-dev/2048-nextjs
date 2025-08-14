import { useState, useEffect } from 'react';

export const useTheme = () => {
	const [currentTheme, setCurrentTheme] = useState<string>('gif');

	useEffect(() => {
		// Загружаем сохраненную тему из localStorage
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('gameTheme');
			if (savedTheme) {
				setCurrentTheme(savedTheme);
			}
		}
	}, []);

	const changeTheme = (themeId: string) => {
		setCurrentTheme(themeId);
		if (typeof window !== 'undefined') {
			localStorage.setItem('gameTheme', themeId);
		}
	};

	return { currentTheme, changeTheme };
};
