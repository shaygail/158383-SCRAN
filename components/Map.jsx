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
						src="//massey.maps.arcgis.com/apps/Embed/index.html?webmap=88685d3e83a34e7bb198a1d66bcd762a&extent=158.302,-47.4784,180,-33.2365&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&legend=true&disable_scroll=true&theme=light"
						alt="demo"
						borderRadius="lg"
					/>
				</AspectRatio>
			</Container>
		</Box>
	);
};

export default Map;
