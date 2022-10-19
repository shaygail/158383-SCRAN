import { AspectRatio, Box, Container, Heading } from '@chakra-ui/react';

const Analytics = (props) => {
	return (
		<Box bg="green.400" {...props}>
			<Heading align="center" color="white" my={8} id="analytics">
                Analytics
			</Heading>
			<Container maxW="container.lg">
				<AspectRatio ratio={16 / 9}>
					<Box
						as="iframe"
						src="supplychaintrends2022.html"
						alt="google trends"
						borderRadius="lg"
					/>
				</AspectRatio>
			</Container>
		</Box>
	);
};

export default Analytics;
