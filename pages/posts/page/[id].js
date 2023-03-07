import Link from 'next/link';
import { Pagination } from "../../../components/Pagination";
import { client } from "../../../lib/Clients";
import Date from "../../../components/Date";
import Head from "next/head";
import Layout, { siteTitle } from "../../../components/layout";
import utilStyles from "../../../styles/utils.module.css";
// import { getSortedPostsData } from '../../../lib/posts';
import Hero from "../../../components/Hero";

const PER_PAGE = 9;

export default function BlogPageId({blog, totalCount, category}) {
    console.log(blog);
    // console.log(totalCount);
    return(
        <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <Hero />
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>All Posts</h2>
            <ul className={utilStyles.list}>
            {blog.map(({id, createdAt, title, category, eyecatch}) => (
                <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                <div className={utilStyles.pictureBox}>
                <picture className={utilStyles.picture}>
                    <img src={eyecatch.url} alt="eyecatch" />
                </picture>
                </div>
                <div className={utilStyles.cardContent}>
                <h2>{title}</h2>
                <small className={utilStyles.lightText}>
                    <Date dateString={createdAt} />
                </small>
                </div>
                </Link>
                </li>
            ))}
            </ul>
        </section>
        <Pagination totalCount={totalCount}></Pagination>

        <div className={utilStyles.categoryContainer}>
        <h3>Category</h3>
        <ul>
        {category.map((category) => (
            <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
            </li>
            ))}
        </ul>
        </div>

        </Layout>
    )
}

// 動的なページを作成
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "blogs" });
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/posts/page/${repo}`);
    return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
    const id = context.params.id;
  
    const data = await client.get({ endpoint: "blogs", queries: { offset: (id - 1) * 9, limit: 9 } });
    // カテゴリーの取得
    const categoryData = await client.get({endpoint: 'categories'})
    return {
      props: {
        blog: data.contents,
        totalCount: data.totalCount,
        category: categoryData.contents,
      },
    };
  };