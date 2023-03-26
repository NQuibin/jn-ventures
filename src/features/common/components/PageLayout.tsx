import type { ReactNode } from 'react';

import Head from 'next/head';
import { Layout } from 'antd';

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
        <meta
          key="description"
          name="description"
          content="Jeanelle and Nik's adventures"
        />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <main className="bg-neutral-100 flex flex-col min-h-screen">
          {children}
        </main>
      </Layout>
    </>
  );
}
