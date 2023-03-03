import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import { client } from "../../lib/Clients";

export default function NewsPage() {
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
            <p>{data.publishedAt}</p>
        </div>
    );
}

// export default function previewHome() {
//     console.log(data);
//     return (
//         <div>
//             <h2>{title}</h2>
//         </div>
//     );
// }