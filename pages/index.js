import Head from 'next/head';
import Header from '../components/header';
import {
	Container,
	Box,
	AspectRatio,
	SimpleGrid,
	Divider,
	InputGroup,
	Input,
} from '@chakra-ui/react';

export default function Home() {
	return (
		<>
			<Header />
			<Container maxWidth='1200px'>
				<Box margin='1rem'>
					<InputGroup marginBottom='2rem'>
						<Input type='file' id='input' accept='video/*' />
					</InputGroup>
				</Box>
				<Box bg='lightgrey' marginBottom='1rem'>
					<AspectRatio maxH='400px' ration={16 / 9}>
						<div>Video Component</div>
					</AspectRatio>
				</Box>
			</Container>
		</>
	);
}
