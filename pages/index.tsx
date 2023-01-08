import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { InferGetStaticPropsType } from 'next';
import Date from '../components/date';

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
        <p>Hello, I'm Donghyeon.</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <Link href="https://nextjs.org/learn">our Next.js tutorial</Link>.)
          {/* <button onClick={ ()=>{ console.log(allPostsData) }}>check</button> */}
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
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
      </section>
    </Layout>
    </>
  );
}