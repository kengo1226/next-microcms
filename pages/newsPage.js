import React from 'react'
import Head from 'next/head';
import Link from "next/link";
import Layout from '../components/layout';
import Hero from '../components/Hero';
import newsStyles from "../styles/news.module.css";
import axios from "axios";


export default function newsPage({users}) {
  return (
    <Layout>
        <Head>
            <title>Newspage｜AozoraBLOG</title>
        </Head>
        <Hero />
        <div className={newsStyles.newsContainer}>
        <div>
			<div>
				<h2>
					This is News Page 
				</h2>
			</div>
			<div>
				<h3>
					Get Top <span>News</span> Quickly
				</h3>
				{users.map((user) => {
					return(
						<div key={user.key}>
							<p>{user.name}</p>
						</div>
					)
				})}
			</div>
		</div>
        </div>
    </Layout>
  )
}

export async function getStaticProps(){
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	const data = await res.json();
	
	
	return{
		props: {
			users: data,
		}
	}
}
