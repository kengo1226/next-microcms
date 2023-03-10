import Link from "next/link";
import Date from "../components/Date";
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Hero from '../components/Hero';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/Posts';
// import {Pagination} from "../components/Pagination";
import {client} from "../lib/Clients";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  const data = await client.get({ endpoint: 'blogs', queries: {offset: 0, limit: 9999}});
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

  const [isButtonActive, setIsButtonActive] = useState(false);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollWindow)
    return () => {
      window.addEventListener('scroll', scrollWindow)
    }
  }, [])

  const scrollWindow = () => {
    const top = 150;
    let scroll = 0;
    scroll = window.scrollY
    if(top <= scroll ) {
      setIsButtonActive(true)
    } else {
      setIsButtonActive(false)
    }
  }

  const normalStyle = {
    opacity: 0,
    transition: '0.3s',
    PointerEvent: 'none',
  }

  const activeStyle = {
    opacity: 1,
    transition: '0.3s',
  }

  const style = isButtonActive ? activeStyle : normalStyle;

  const [offset, setOffset] = useState(0);
  const perPage = 9;

  const handlePageChange = (blog) => {
    // setOffset(data.selected * perPage);
    let page_number = blog['selected'];
    setOffset(page_number * perPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

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
          {blog.slice(offset, offset + perPage).map(({id, createdAt, title, category, eyecatch}) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
            <div className={utilStyles.pictureBox}>
              <picture className={utilStyles.picture}>
                <img src={eyecatch.url} alt="eycatch" />
              </picture>
            </div>
            <div className={utilStyles.cardContent}>
              <p>{category.name}</p>
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
      {/* <Pagination totalCount={totalCount}></Pagination> */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={Math.ceil(blog.length / perPage)}
        onPageChange={handlePageChange}
        containerClassName={utilStyles.pagination}
        activeClassName={utilStyles.active}
      />

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

      <div className={utilStyles.returnTopButton}>
        {/* <button style={style} onClick={returnTop}>GoTOP</button> */}
        <Image src="/images/returnTopButton.svg" style={style} onClick={returnTop} width={60} height={60} objectFit="cover" />
      </div>
    </Layout>
  );
}