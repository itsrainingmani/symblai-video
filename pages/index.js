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
import { useAuth, useInterval } from '../hooks';

export default function Home() {
	const [file, setFile] = useState('');
	const [videoSrc, setVideoSrc] = useState('');
	const [conversationId, setConversationId] = useState(null);
	const [jobId, setJobId] = useState(null);
	const [status, setStatus] = useState('not started');

	// in case we need a reference to the video in the future
	const videoRef = useRef(null);

	const { token, setToken } = useAuth();
	const submitFileForProcessing = async (file) => {
		const rawResult = await fetch('https://api.symbl.ai/v1/process/video', {
			method: 'POST',
			headers: {
				'x-api-key': token,
				'Content-Type': 'video/mp4',
			},
			body: file,
			json: true,
		});
		const result = await rawResult.json();
		console.log(result);
		setConversationId(result.conversationId);
		setJobId(result.jobId);
	};

	useInterval(
		() => {
			fetch(`https://api.symbl.ai/v1/job/${jobId}`, {
				method: 'GET',
				headers: {
					'x-api-key': token,
				},
			})
				.then((rawResult) => rawResult.json())
				.then((result) => setStatus(result.status));
		},
		1000,
		status === 'completed' || !jobId
	);

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
					<Button
						colorScheme='teal'
						size='md'
						onClick={() => {
							submitFileForProcessing(file);
						}}
					>
						Send for Processing
					</Button>
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
