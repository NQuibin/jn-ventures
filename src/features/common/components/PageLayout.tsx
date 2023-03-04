import type { ReactNode } from 'react';

import Head from 'next/head';

interface PageLayoutProps {
  headTitle: string;
  children: ReactNode;
}

export default function PageLayout({ headTitle, children }: PageLayoutProps) {
  const title = `JN Ventures | ${headTitle}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Jeanelle and Nik's adventures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="bg-neutral-100 min-h-screen">{children}</main>
    </>
  );
}
