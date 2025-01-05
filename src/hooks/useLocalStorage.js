import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const saved = localStorage.getItem(key);
			return saved !== null ? JSON.parse(saved) : initialValue;
		} catch (error) {
			console.warn(`Error parsing localStorage for key "${key}":`, error);
			return initialValue;
		}
	});

useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error(`Error saving localStorage for key "${key}":`, error);
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}