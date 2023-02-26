import React, { ReactNode } from 'react';
import Head from 'next/head';

interface PageLayoutProps {
  headTitle: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ headTitle, children }) => {
  const title = `JN Ventures | ${headTitle}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Jeanelle and Nik's adventures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default PageLayout;
