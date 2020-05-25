import React from 'react';
import ReactMarkdown from "react-markdown";
import glob from "glob";

export default function Post(props) {
    return (
        <div>
            <ReactMarkdown source={props.markdownBody}/>
            <style jsx>{`
            * {
                font-family: Hack
            }
            `}</style>
        </div>
    )
}

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params;
    const content = await import(`../../posts/${slug}.md`);
    return {
        props: {
            markdownBody: content.default,
        }
    }
}

export async function getStaticPaths() {
    const posts = glob.sync("**/*.md", {cwd: "posts/"});
    return {
        paths: posts.map(postFileName => ({
            params: { slug: postFileName.slice(0, -3) }
        })),
        fallback: false,
    }
}