import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "./useLocalStorage.js";

export function useColorScheme() {
	const systemPrefersDark = useMediaQuery({
		query: "(prefers-color-scheme: dark)",
	});

	const [isDark, setIsDark] = useLocalStorage("colorScheme", undefined);

	const value = useMemo(
		() => (isDark === undefined ? systemPrefersDark : isDark),
		[isDark, systemPrefersDark],
	);

	useEffect(() => {
		document.body.classList.toggle("dark", value);
	}, [value]);

	return {
		isDark: value,
		toggleTheme: () =>
			setIsDark((prev) =>
				prev === undefined ? !systemPrefersDark : !prev,
			),
	};
}
