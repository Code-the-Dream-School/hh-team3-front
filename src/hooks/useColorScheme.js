import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useColorScheme() {
	const systemPrefersDark = useMediaQuery({
		query: '(prefers-color-scheme: dark)',
	});

	const [isDark, setIsDark] = useState(() => {
		const storedValue = localStorage.getItem('colorScheme');
		return storedValue !== null
			? JSON.parse(storedValue)
			: undefined; //
	});

	const value = useMemo(
		() =>
			isDark === undefined ? systemPrefersDark : isDark,
		[isDark, systemPrefersDark]
	);

	useEffect(() => {
		if (isDark !== undefined) {
			localStorage.setItem(
				'colorScheme',
				JSON.stringify(isDark)
			);
		}
	}, [isDark]);

	useEffect(() => {
		document.body.classList.toggle('dark', value);
	}, [value]);

	return {
		isDark: value,
		toggleTheme: () =>
			setIsDark((prev) =>
				prev === undefined ? !systemPrefersDark : !prev
			),
	};
}
