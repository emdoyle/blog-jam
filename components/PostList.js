import React from 'react';
import Link from 'next/link';

export default function PostList(props) {
    return (
        <div>
            {props.postNames.map(postName => (
                <React.Fragment key={`${postName}-fragment`}>
                    <Link href={"posts/[slug]"} as={`posts/${postName}`}>
                        <a>{postName}</a>
                    </Link>
                    <br />
                </React.Fragment>
            ))}
        </div>
    )
}
