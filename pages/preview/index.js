import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import { client } from "../../lib/Clients";
import { siteTitle } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/Posts";

export async function getStaticPaths() {
    const paths = await getAllPostIds();
        return {
            paths,
            fallback: true,
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

export default function NewsPage () {
    const [data, setData] = useState();
    const router = useRouter();
    useEffect(() => {
        const getBlogsData = async () => {
            if(!router.isReady) return;
            const res = await client.get({
                endpoint: 'blogs',
                contentId: router.query.slug,
                queries: { draftKey: router.query.draftKey },
            });
            setData(res);
        };
        getBlogsData();
    }, [router]);

    console.log(data);
    return (
        <div>
            <h1>{data.title}</h1>
            <h1>{data.content}</h1>
        </div>
    )
    // return (
    //     <div>
    //         <h1>{data.title}</h1>
    //         <p>{data.createdAt}</p>
    //     </div>
    // );
}

// export default function previewHome() {
//     console.log(data);
//     return (
//         <div>
//             <h2>{title}</h2>
//         </div>
//     );
// }