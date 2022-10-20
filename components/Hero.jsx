import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function Hero(props) {
	return (
		<Container maxW={'3xl'} {...props}>
			<Stack textAlign={'center'} spacing={{ base: 8, md: 14 }}>
				<Heading
					fontWeight={600}
					fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
					lineHeight={'110%'}
				>
					Supply Chain Risk <br />
					<Text as={'span'} color={'green.400'}>
						Identification Information Platform
					</Text>
				</Heading>
				<Text color={'gray.500'}>
					This website shows a live map of any traffic situation all over New Zealand.
				</Text>
				<Stack
					direction={'column'}
					spacing={3}
					align={'center'}
					alignSelf={'center'}
					position={'relative'}
				>
					<Button
						colorScheme={'green'}
						bg={'green.400'}
						rounded={'full'}
						px={6}
						_hover={{
							bg: 'green.500'
						}}
						as="a"
						href="#map"
					>
						Live Map
					</Button>
					<Button variant={'link'} colorScheme={'blue'} size={'sm'}>
						Learn more
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
}
