import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';

export const siteTitle = "Like a Diamond";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
                name="description"
                content="Henoziwd's personal blog."
            />
            <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(
                    siteTitle,
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Link href="/" className={utilStyles.colorInherit}>
                    Like a Diamond
                </Link>
            </header>
            <div className={styles.container}>
                <main>{children}</main>
            </div>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <Link href="https://github.com/HENOZIWD">Henoziwd's Github</Link>
                    <Link href="https://github.com/HENOZIWD/nextjs-blog">Repository</Link>
                </div>
            </footer>
        </div>
        </>
    );
}