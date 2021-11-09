import React from "react";
import ReactMarkdown from "react-markdown";
import glob from "glob";
import moment from "moment";
import Layout from "../../components/Layout";

export default function Post(props) {
  return (
    <Layout noHeader lastUpdated={props.lastUpdated}>
      <div className="post-content">
        <ReactMarkdown>
        {props.markdownBody}
        </ReactMarkdown>
      </div>
      <style jsx>{`
        .post-content {
          display: block;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const content = await import(`../../posts/${slug}.md`);
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
      params: { slug: postFileName.slice(0, -3) },
    })),
    fallback: false,
  };
}
