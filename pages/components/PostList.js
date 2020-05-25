import React from 'react';
import Link from 'next/link';

export default function PostList(props) {
    return (
        <div>
            {props.postNames.map(postName => (
                <Link key={`${postName}-link`} href={`posts/${postName}`}>
                    <a>{postName}</a>
                </Link>
            ))}
        </div>
    )
}
