import Link from "next/link";
import Date from "../components/Date";
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Hero from '../components/Hero';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/Posts';
import {Pagination} from "../components/Pagination";
import {client} from "../lib/Clients";
import React, {useState} from "react";

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  const data = await client.get({ endpoint: 'blogs', queries: {offset: 0, limit: 9}});
  // カテゴリーの取得
  const categoryData = await client.get({endpoint: 'categories'})
  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      category: categoryData.contents,
    },
  };
}

export default function Home({blog, totalCount, category}) {
console.log(blog);
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
  );
}