import { useMemo } from 'react';
import { Theme, themesMap } from '../theme/themes';

export const useThemeStyles = (currentTheme: string) => {
	const themeStyles = useMemo(() => {
		return themesMap[currentTheme] || themesMap.gif;
	}, [currentTheme]);

	return themeStyles;
};
