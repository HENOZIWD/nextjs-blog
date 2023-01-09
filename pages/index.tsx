import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { InferGetStaticPropsType } from 'next';
import Date from '../components/date';
import React, { useRef } from 'react';

export const getStaticProps = async () => {
  
  const allPostsData = getSortedPostsData();
  
  return {
    props: {
      allPostsData,
    },
  };
  
}

export default function Home({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm Donghyeon.
          <br />
          This is my pernonal page for learning Next.js, React, Typescript and CSS.
        </p>
        <p>
          You can visit <Link href="https://github.com/HENOZIWD/nextjs-blog">my github repository</Link>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.listContainer}>
          <ul className={utilStyles.list}>
            {allPostsData && allPostsData.map(({ id, date, title }) => (
              <Link href={`/posts/${id}`}>
              <li className={utilStyles.listItem} key={id}>
                {title}
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
              </Link>
            ))} 
          </ul>
        </div>
      </section>
    </Layout>
    </>
  );
}