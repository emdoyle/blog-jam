import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import glob from "glob";
import moment from "moment";
import Layout from "../../components/Layout";

export default function Post(props) {
  return (
    <Layout lastUpdated={props.lastUpdated}>
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {props.markdownBody}
        </ReactMarkdown>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  const selectedPostName = posts.find((postName) => postName.slice(11, -3) === slug);
  const content = await import(`../../posts/${selectedPostName}`);
  return {
    props: {
      markdownBody: content.default,
      lastUpdated: moment().format("MM/DD/YYYY"),
    },
  };
}

export async function getStaticPaths() {
  const posts = glob.sync("**/*.md", { cwd: "posts/" });
  return {
    paths: posts.map((postFileName) => ({
      params: { slug: postFileName.slice(11, -3) },
    })),
    fallback: false,
  };
}
