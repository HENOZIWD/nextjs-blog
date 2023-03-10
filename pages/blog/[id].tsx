import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, IPostIds } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";


export default function Post({ postData }: {[key: string]: any}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.firstDate} />
                </div>
                <ReactMarkdown 
                    children={postData.contents}
                    remarkPlugins={[remarkGfm]}
                />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
        // if fallback is false, then any paths not returned by getStaticPaths.
        // will result in a 404 page.
    };
}

export async function getStaticProps({ params }: IPostIds) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}