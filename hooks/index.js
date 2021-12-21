import { createContext, useContext, useState, useRef, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export const useInterval = (callback, delay, stopFlag) => {
	const savedCallbackRef = useRef();

	//remember the latest callback
	useEffect(() => {
		savedCallbackRef.current = callback;
	}, [callback]);

	// set up the interval
	useEffect(() => {
		let id;
		const tick = () => {
			savedCallbackRef.current();
			if (stopFlag) {
				clearInterval(id);
			}
		};

		if (delay !== null && !stopFlag) {
			id = setInterval(tick, delay);
			return () => {
				clearInterval(id);
			};
		}
	});
};
