import React from "react";
import Link from "next/link";

export default function PostList(props) {
  return (
    <div className="post-list">
      {props.postNames.map((postName) => (
        <Link key={`${postName}-key`} href={`/posts/${postName}`}>
          <a>{postName.replace(/\W|_/gi, " ")}</a>
        </Link>
      ))}
    </div>
  );
}
