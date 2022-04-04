import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import moment from "moment";
import glob from "glob";

export default function Home(props) {
  console.log(props);
  return (
    <Layout titlePage lastUpdated={props.lastUpdated}>
      <PostList postNames={props.postNames} />
    </Layout>
  );
}

export async function getStaticProps() {
  // TODO: order these somehow
  //   parse release date from title
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  console.log(posts);
  console.log(posts.map((postFileName) => postFileName.slice(11, -3)));
  return {
    props: {
      postNames: posts.map((postFileName) => postFileName.slice(11, -3)),
      lastUpdated: moment().format("MM/DD/YYYY"),
    },
  };
}
