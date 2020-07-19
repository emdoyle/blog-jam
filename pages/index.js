import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import moment from "moment";
import glob from "glob";

export default function Home(props) {
  return (
    <Layout
      siteTitle="Figures"
      siteDescription="Some blog posts"
      lastUpdated={props.lastUpdated}
    >
      <PostList postNames={props.postNames} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  return {
    props: {
      postNames: posts.map((postFileName) => postFileName.slice(0, -3)),
      lastUpdated: moment().format("MM/DD/YYYY"),
    },
  };
}
