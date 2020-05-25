import React from "react";
import Layout from './components/Layout';
import PostList from './components/PostList'
import moment from "moment";
import glob from "glob";

export default function Home(props) {
    return (
        <Layout
            lastUpdated={props.lastUpdated}
        >
            <PostList
                postNames={props.postNames}
            />
            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
                }
                
                * {
                box-sizing: border-box;
                }
            `}</style>
        </Layout>
    )
}


export async function getStaticProps() {
    const posts = glob.sync("**/*.md", {cwd: "posts/"});
    return {
        props: {
            postNames: posts.map(postFileName => postFileName.slice(0, -3)),
            lastUpdated: moment().format('MM/DD/YYYY')
        }
    }
}
