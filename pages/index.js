import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
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
import ProtectedPage from '../components/protectedPage';

export default function Home() {
	const [file, setFile] = useState('');
	const [videoSrc, setVideoSrc] = useState('');

	// in case we need a reference to the video in the future
	const videoRef = useRef(null);

	useEffect(() => {
		const src = URL.createObjectURL(new Blob([file], { type: 'video/mp4' }));
		setVideoSrc(src);
	}, [file]);

	return (
		<ProtectedPage>
			<Container maxWidth='1200px'>
				<Box margin='1rem'>
					<InputGroup marginBottom='2rem'>
						<Input
							type='file'
							id='input'
							accept='video/*'
							ref={videoRef}
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</InputGroup>
					<Box bg='lightgrey' marginBottom='1rem'>
						<AspectRatio maxH='100%' ratio={16 / 9}>
							<video id='video-summary' controls src={videoSrc} />
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
		</ProtectedPage>
	);
}
