import Head from "next/head";

import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { InputText } from "@/components/input-text";
import { InputAutocomplete } from "@/components/input-autocomplete";
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
  const suggestions = [
    { label: "Engineering", value: "engineering" },
    { label: "Finance", value: "finance" },
  ];
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
        <main className={styles.main}>
          {children}
          {/* <InputText label="Full Name" />
          <InputText label="Email" />
          <InputAutocomplete label="Department" options={suggestions} /> */}
        </main>
      </div>
    </>
  );
};
