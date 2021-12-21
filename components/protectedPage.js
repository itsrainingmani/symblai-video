import React, { useState } from 'react';
import {
	Container,
	Button,
	Input,
	Stack,
	FormLabel,
	Box,
} from '@chakra-ui/react';
import Header from './header';
import { useAuth } from '../hooks';

const ProtectedPage = ({ children }) => {
	const [appId, setAppId] = useState('');
	const [appSecret, setAppSecret] = useState('');
	const { token, setToken } = useAuth('');

	const isLoggedIn = token;

	const loginToSymbl = async () => {
		const response = await fetch('https://api.symbl.ai/oauth2/token:generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify({
				type: 'application',
				appId,
				appSecret,
			}),
		});

		const json = await response.json();
		setToken(json.accessToken);
		console.log(json);
	};

	return (
		<>
			<Header />
			{!isLoggedIn ? (
				<Container>
					<Stack spacing={2} marginBottom='1rem'>
						<Box marginBottom='1rem'>
							<FormLabel>App ID</FormLabel>
							<Input
								placeholder='appId'
								size='md'
								value={appId}
								onChange={(e) => setAppId(e.target.value)}
							/>
						</Box>
						<Box>
							<FormLabel>App Secret</FormLabel>
							<Input
								type='password'
								placeholder='appSecret'
								size='md'
								value={appSecret}
								onChange={(e) => setAppSecret(e.target.value)}
							/>
						</Box>
					</Stack>
					<Button onClick={() => loginToSymbl()}>Login</Button>
				</Container>
			) : (
				children
			)}
		</>
	);
};

export default ProtectedPage;
