import React from 'react';
import styles from './ThemeSelector.module.scss';
import { Theme, themesArray } from '../../theme/themes';

interface ThemeSelectorProps {
	currentTheme: string;
	onThemeChange: (themeId: string) => void;
	lockedBase?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
	currentTheme,
	onThemeChange,
	lockedBase,
}) => {
	const themes = themesArray;
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
							opacity: lockedBase && theme.id === 'gif' ? 0.5 : 1,
							pointerEvents: lockedBase && theme.id === 'gif' ? 'none' : 'auto',
						}}
						disabled={lockedBase && theme.id === 'gif'}
					>
						{theme.name}
						{lockedBase && theme.id === 'gif' && (
							<span style={{ fontSize: '0.8em', color: '#f00', marginLeft: 4 }}>
								(off)
							</span>
						)}
					</button>
				))}
			</div>
		</div>
	);
};

export default ThemeSelector;
