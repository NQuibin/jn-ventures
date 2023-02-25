import Head from 'next/head';
import { SpotService } from '@/services/spots/service';

export const getServerSideProps = async () => {
  const spots = await new SpotService().listSpots();

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <>
      <Head>
        <title>JN Ventures</title>
        <meta name="description" content="Jeanelle and Nik's adventures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
