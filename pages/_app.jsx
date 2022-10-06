import { ChakraProvider } from '@chakra-ui/react';
import Nav from '../components/Nav';
import '../styles/globals.css';

const links = [
	{ name: 'Home', href: '/' },
	{ name: 'Map', href: '#map' },
	{ name: 'News', href: '#news' },
	{ name: 'Analytics', href: '#analytics' },
	{ name: 'Contact', href: '#contact' }
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
