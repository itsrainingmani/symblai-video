import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from '../hooks';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};

const theme = extendTheme({ colors });

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ChakraProvider resetCss theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}

export default MyApp;
