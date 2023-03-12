import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src={GOOGLE_MAPS_URL} strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
