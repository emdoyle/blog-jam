import React from "react";
import Head from "next/head";
import DarkMode from "../components/DarkMode";
import Layout from '../components/Layout';
import PostList from '../components/PostList'
import moment from "moment";
import glob from "glob";

export default function Home(props) {
    return (
        <React.Fragment>
            <Head>
                <title>Figures</title>
                <DarkMode />
            </Head>
            <Layout
                siteTitle="Figures"
                siteDescription="Some blog posts"
                lastUpdated={props.lastUpdated}
            >
                <PostList
                    postNames={props.postNames}
                />
            </Layout>
        </React.Fragment>
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
