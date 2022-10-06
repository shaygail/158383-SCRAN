import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	IconButton,
	Link,
	Stack,
	useColorMode,
	useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';

const bg = 'green.400';

const NavLink = ({ href, children, ...rest }) => (
	<NextLink href={href.toLowerCase()} passHref>
		<Link
			as={Button}
			colorscheme="green"
			bg={bg}
			color="white"
			_hover={{
				textDecoration: 'none',
				bg: 'green.500'
			}}
			{...rest}
		>
			{children}
		</Link>
	</NextLink>
);

const Logo = () => {
	return (
		<Link
			href="/"
			_hover={{
				textDecoration: 'none'
			}}
			color="white"
			fontWeight="extrabold"
			fontFamily="sans-serif"
			fontSize={32}
			letterSpacing={'widest'}
		>
			SCRAN
		</Link>
	);
};

export default function Nav({ links }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			as="nav"
			bg={bg}
			pos="fixed"
			w="full"
			zIndex={2}
			borderBottom="1px"
		>
			<Container maxW="container.lg">
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
						colorScheme="green"
						bg={bg}
						color="white"
					/>

					<Logo />

					<HStack
						as={'nav'}
						display={{ base: 'none', md: 'flex' }}
						alignSelf="center"
					>
						{links.map((link) => (
							<NavLink key={link.name} href={link.href}>
								{link.name}
							</NavLink>
						))}
					</HStack>

					<Button
						onClick={toggleColorMode}
						colorScheme="green"
						bg={bg}
						color="white"
					>
						{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					</Button>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4} align="center">
							{links.map((link) => (
								<NavLink key={link.name} href={link.href}>
									{link.name}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Container>
		</Box>
	);
}
