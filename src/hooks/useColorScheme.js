import { useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import createPersistedState from 'use-persisted-state';

const useColorSchemeState =
	createPersistedState('colorScheme');

export function useColorScheme() {
	const systemPrefersDark = useMediaQuery({
		query: '(prefers-color-scheme: dark)',
	});

	const [isDark, setIsDark] = useColorSchemeState();

	const value = useMemo(
		() =>
			isDark === undefined ? systemPrefersDark : isDark,
		[isDark, systemPrefersDark]
	);

	useEffect(() => {
		document.body.classList.toggle('dark', value);
	}, [value]);

	return {
		isDark: value,
		toggleTheme: () => setIsDark((prev) => !prev),
	};
}
