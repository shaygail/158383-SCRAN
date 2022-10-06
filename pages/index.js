import Head from 'next/head';
import Hero from '../components/Hero';
import Map from '../components/Map';
import NewsFeed from '../components/NewsFeed';

export default function Home() {
	return (
		<>
			<Head>
				<title>SCRAN</title>
				<meta
					name="description"
					content="Supply Chain Risk Identification Information Platform"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero py={20} pt={36} />
			<Map py={8} />
			<NewsFeed />
		</>
	);
}
