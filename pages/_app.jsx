import { ChakraProvider } from '@chakra-ui/react';
import Nav from '../components/Nav';
import '../styles/globals.css';

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'News', href: '/news' },
	{ name: 'Map', href: '/map' },
	{ name: 'Analytics', href: '/analytics' },
	{ name: 'Contact', href: '/contact' }
];

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Nav links={links} />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
