import React from 'react';
import Link from 'next/link';

export default function PostList(props) {
    return (
        <div>
            {props.postNames.map(postName => (
                <React.Fragment>
                    <Link key={`${postName}-link`} href={"posts/[slug]"} as={`posts/${postName}`}>
                        <a key={`${postName}-link-text`}>{postName}</a>
                    </Link>
                    <br />
                </React.Fragment>
            ))}
        </div>
    )
}
