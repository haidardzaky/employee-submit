import Head from "next/head";

import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/MainLayout.module.css";

import { PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface MainLayoutProps {
  title: string;
  description?: string;
}

export const MainLayout = (props: PropsWithChildren<MainLayoutProps>) => {
  const { title, description, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};
