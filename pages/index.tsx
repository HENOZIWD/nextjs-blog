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
  const threePostsData = allPostsData.slice(0, 3);
  
  return {
    props: {
      threePostsData,
    },
  };
  
}

export default function Home({ threePostsData }: InferGetStaticPropsType<typeof getStaticProps>) {

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
          You can visit <Link href="https://github.com/HENOZIWD/nextjs-blog" target="_blank" rel="noopener noreferrer">my github repository</Link>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.listContainer}>
          <ul className={utilStyles.list}>
            {threePostsData && threePostsData.map(({ id, firstDate, title, updateDate }) => (
              <Link href={`/blog/${id}`} key={id}>
                <li className={utilStyles.listItem}>
                  {title}
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={firstDate} />
                    {updateDate && 
                      <>
                        &nbsp;updated&nbsp;
                        <Date dateString={updateDate} />
                      </>}
                  </small>
                </li>
              </Link>
            ))} 
          </ul>
        </div>
        <Link href="/blog">show more</Link>
      </section>
    </Layout>
    </>
  );
}