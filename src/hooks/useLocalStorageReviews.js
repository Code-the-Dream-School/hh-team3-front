import { useState, useEffect } from 'react';

export default function useLocalStorageReviews(key, initialValue) {
	const [reviews, setReviews] = useState(() => {
		const saved = localStorage.getItem(key);
		return saved ? JSON.parse(saved) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(reviews));
	}, [key, reviews]);

	return [reviews, setReviews];
}