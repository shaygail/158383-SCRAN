import { AspectRatio, Box, Container, Heading } from '@chakra-ui/react';

const Map = (props) => {
	return (
		<Box bg="green.400" {...props}>
			<Heading align="center" color="white" my={8} id="map">
				Live Map
			</Heading>
			<Container maxW="container.lg">
				<AspectRatio ratio={16 / 9}>
					<Box
						as="iframe"
						src="https://www.google.com/maps/d/embed?mid=1yPs4eTny-QyFoAvJsiiRloYY2kPnmJM&ehbc=2E312F"
						alt="demo"
						borderRadius="lg"
					/>
				</AspectRatio>
			</Container>
		</Box>
	);
};

export default Map;
