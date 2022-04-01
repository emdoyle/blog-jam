import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import moment from "moment";
import glob from "glob";

export default function Home(props) {
  return (
    <Layout
      titlePage
      siteTitle="Figures"
      siteDescription="Some blog posts"
      lastUpdated={props.lastUpdated}
    >
      <PostList postNames={props.postNames} />
    </Layout>
  );
}

export async function getStaticProps() {
  // TODO: order these somehow
  //   parse release date from title
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  return {
    props: {
      postNames: posts.map((postFileName) => postFileName.slice(11, -3)),
      lastUpdated: moment().format("MM/DD/YYYY"),
    },
  };
}
