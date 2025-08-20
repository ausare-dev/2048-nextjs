import React from 'react';
import styles from './ThemeSelector.module.scss';
import { Theme, themesArray } from '../../theme/themes';

interface ThemeSelectorProps {
	currentTheme: string;
	onThemeChange: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
	currentTheme,
	onThemeChange,
}) => {
	const themes: Theme[] = themesArray;

	return (
		<div className={styles.themeSelector}>
			<div className={styles.themes}>
				{themes.map(theme => (
					<button
						key={theme.id}
						className={`${styles.themeButton} ${
							currentTheme === theme.id ? styles.active : ''
						}`}
						onClick={() => onThemeChange(theme.id)}
						style={{
							background: theme.colors.scoreCounter,
							borderColor: theme.colors.scoreCounterBorder,
						}}
					>
						{theme.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default ThemeSelector;
