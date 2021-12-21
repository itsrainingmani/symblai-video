import Head from 'next/head';
import Header from '../components/header';
import {
	Button,
	Container,
	Box,
	AspectRatio,
	SimpleGrid,
	Divider,
	InputGroup,
	Input,
	Heading,
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
					<Box bg='lightgrey' marginBottom='1rem'>
						<AspectRatio maxH='400px' ration={16 / 9}>
							<div>Video Component</div>
						</AspectRatio>
					</Box>
					<Button>Send for Processing</Button>
				</Box>
				<Divider orientation='horizontal' />
				<Heading>Processing Data</Heading>
				<SimpleGrid
					columns={2}
					spacingX='40px'
					spacingY='20px'
					marginTop='1rem'
				>
					<Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
						<Container margin='1rem'>
							<Heading as='h4' size='md'>
								Transcripts pulled from Conversation API
							</Heading>
						</Container>
					</Box>
				</SimpleGrid>
			</Container>
		</>
	);
}
