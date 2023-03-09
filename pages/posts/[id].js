// import head
import Date from "../../components/Date";
import Head from "next/head";
import Layout from '../../components/layout';
import SubHero from "../../components/SubHero";
import Image from "next/image";
import { getAllPostIds, getPostData } from "../../lib/Posts";

// import CSS
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
    const paths = await getAllPostIds();
        return {
            paths,
            fallback: false,
        };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    console.log(postData);
    console.log(postData.meta.dscription);
    return (
        <Layout>
        <Head>
            <title>{postData.title}｜Aozora BLOG</title>
            <meta name="description" content={postData.meta.dscription} />
        </Head>
        <SubHero />
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <br />
            <div className={utilStyles.lightText}>
                <Date dateString={postData.createdAt} />
            </div>
            <br />
            <div dangerouslySetInnerHTML={{__html: postData.content}} />
        </Layout>
    )
}