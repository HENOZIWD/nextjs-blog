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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.listContainer}>
          <ul className={utilStyles.list}>
            {allPostsData && allPostsData.map(({ id, firstDate, title, updateDate }) => (
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
      </section>
    </Layout>
    </>
  );
}