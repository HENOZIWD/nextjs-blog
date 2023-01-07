import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface IPostIds {
    params: {id: string};
}

export function getSortedPostsData(): {[key: string]: any} {

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: {[key: string]: any} = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allPostsData.sort((a, b): number => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds(): IPostIds[] {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName): IPostIds => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id: string): Promise<{[key: string]: any}> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}