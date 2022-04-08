import React from "react";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from "remark-frontmatter";
import glob from "glob";
import moment from "moment";
import Layout from "../../components/Layout";

export default function Post(props) {
  return (
    <Layout title={props.title} subtitle={props.subtitle} lastUpdated={props.lastUpdated} emailForm>
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkFrontmatter]}>
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

  // TODO: fully parsing just to get the front matter in a way that's consistent with the client
  //   probably some way to avoid parsing again on the client altogether?
  const mdRoot = await unified().use(remarkParse).use(remarkFrontmatter).parse(content.default);
  let title = null, subtitle = null;
  if (mdRoot.children.length && mdRoot.children[0].type === "yaml") {
    const frontMatterLines = mdRoot.children[0].value.split("\n");
    frontMatterLines.forEach((line) => {
      if (line.startsWith("title: ")) {
        title = line.slice(6);
      } else if (line.startsWith("subtitle: ")) {
        subtitle = line.slice(10);
      }
    })
  }

  return {
    props: {
      title,
      subtitle,
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
