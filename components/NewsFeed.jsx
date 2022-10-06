import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

const NewsFeed = (props) => {
	return (
		<Box py={8} {...props}>
			<Heading align="center" color="white" my={8} id="news">
				News
			</Heading>
			<Container maxW="container.lg">
				<SimpleGrid columns={[1, 2]} spacing={4} h="xl">
					<Box
						as="iframe"
						src="https://rss.app/embed/v1/feed/_TaqOVIln8c9y3xXr"
						alt="twitter feed"
						borderRadius="lg"
						w="full"
						h="full"
					/>
					<Box
						as="iframe"
						src="https://rss.app/embed/v1/feed/_5UP4R7tyhrpio2CE"
						alt="twitter feed"
						borderRadius="lg"
						w="full"
						h="full"
					/>
				</SimpleGrid>
			</Container>
		</Box>
	);
};

export default NewsFeed;
