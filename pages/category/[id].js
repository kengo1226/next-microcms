import Link from "next/link";
import { client } from "../../lib/Clients"; 
import Layout, {siteTitle} from "../../components/layout";
import Head from 'next/head';
import Hero from "../../components/Hero";
import utilStyles from "../../styles/utils.module.css";

export default function CategoryId({blog, category}) {
    if(blog.length === 0) {
        return <div>ブログコンテンツがありません</div>
    } 
    return (
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
                    <img src={eyecatch.url} alt="eycatch" />
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

// 静的生成のためのパスを指定する
export const getStaticPaths = async () => {
    const data = await client.get({endpoint: 'categories'});

    const paths = data.contents.map((content) => `/category/${content.id}`);
    return {paths, fallback: false};
}

// データをテンプレートに渡す
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: 'blogs', queries: {filters: `category[equals]${id}`}});
     // カテゴリーの取得
    const categoryData = await client.get({endpoint: 'categories'})

    return {
        props: {
            blog: data.contents,
            category: categoryData.contents,
        }
    }
}