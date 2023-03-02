import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from "remark";
import html from "remark-html";

// import microCMS
import {client} from "./Clients";

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
    const data = await client.get({ endpoint: "blogs" });
    const allPostsData = data.contents;
    return allPostsData.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });
}

// export async function getSortedPostsData() {
//   // Get file names under /posts
// //   const fileNames = fs.readdirSync(postsDirectory);
//     const data = await client.get({endpoint: 'blogs'});
//     const allPostsData = data.contents;
//     return allPostsData.sort((a,b) => {
//         if(a.createAt < b.createAt) {
//             return 1;
//         } else {
//             return -1;
//         }
//     });
// //   const allPostsData = fileNames.map((fileName) => {
// //     // Remove ".md" from file name to get id
// //     const id = fileName.replace(/\.md$/, '');

// //     // Read markdown file as string
// //     const fullPath = path.join(postsDirectory, fileName);
// //     const fileContents = fs.readFileSync(fullPath, 'utf8');

// //     // Use gray-matter to parse the post metadata section
// //     const matterResult = matter(fileContents);

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data,
//     };
//   };
  // Sort posts by date
//   return allPostsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });

export async function getAllPostIds() {
    // const fileNames = fs.readdirSync(postsDirectory);
    
    // return fileNames.map((fileName) => {
    //     return {
    //         params: {
    //             id: fileName.replace(/\.md$/, ''),
    //         },
    //     };
    // });

    const data = await client.get({ endpoint: 'blogs' });

    return data.contents.map((content) => {
        return {
            params: {
                id: content.id,
            },
        }
    })
}

// export async function getPostData(id) {
//     const fullPath = path.join(postsDirectory, `${id}.md`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//         .use(html)
//         .process(matterResult.content);
//     const contentHtml = processedContent.toString();
    
//     // Combine the data with the id and contentHtml
//     return {
//         id,
//         contentHtml,
//         ...matterResult.data,
//     };
// }

export async function getPostData(id) {
    const data = await client.get({
        endpoint: 'blogs',
        contentId: id,
    });
    return data;
}