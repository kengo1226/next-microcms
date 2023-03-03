import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import { client } from "../../lib/Clients";

export function NewsPage() {
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
            return {
                props: {
                    blog: data.contents,
                    totalCount: data.totalCount,
                },
            };
            setData(res);
        };
        getBlogsData();
    }, [router]);

    // return (
    //     <div>
    //         <h1>{data.title}</h1>
    //         <p>{data.publishedAt}</p>
    //     </div>
    // );
}

export default function previewHome({title}) {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
}