import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import moment from "moment";
import glob from "glob";

export default function Home(props) {
  return (
    <Layout titlePage lastUpdated={props.lastUpdated}>
      <PostList postNames={props.postNames} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  /*
   * Precondition for sorting:
   *   filenames are of the form [MM]_[DD]_[YYYY]_[title].md
   * */
  const sortedPosts = posts.sort((a, b) => {
    const aDatePrefix = a.slice(0, 11);
    const bDatePrefix = b.slice(0, 11);
    const [aMonth, aDay, aYear] = [
      Number(aDatePrefix.slice(0, 2)),
      Number(aDatePrefix.slice(3, 5)),
      Number(aDatePrefix.slice(6, 10)),
    ];
    const [bMonth, bDay, bYear] = [
      Number(bDatePrefix.slice(0, 2)),
      Number(bDatePrefix.slice(3, 5)),
      Number(bDatePrefix.slice(6, 10)),
    ];
    const aDate = new Date(aYear, aMonth - 1, aDay);
    const bDate = new Date(bYear, bMonth - 1, bDay);

    // most recent dates should come first
    return bDate - aDate;
  });
  return {
    props: {
      postNames: sortedPosts.map((postFileName) => postFileName.slice(11, -3)),
      lastUpdated: moment().format("MM/DD/YYYY"),
    },
  };
}
