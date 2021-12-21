import React from 'react';
import { Container, Button, Input, Stack } from '@chakra-ui/react';
import Header from './header';

const ProtectedPage = ({ children }) => {
	const isLoggedIn = false;

	return (
		<>
			<Header />
			{!isLoggedIn ? (
				<Container>
					<Stack spacing={3} marginBottom='1rem'>
						<Input placeholder='appId' size='md' />
						<Input placeholder='appSecret' size='md' />
					</Stack>
					<Button>Login</Button>
				</Container>
			) : (
				children
			)}
		</>
	);
};

export default ProtectedPage;
