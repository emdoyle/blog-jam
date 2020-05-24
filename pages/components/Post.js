import React from 'react';
import ReactMarkdown from "react-markdown";

export default function Post(props) {
    return (
        <div>
            <ReactMarkdown source={props.markdownBody}/>
            <style jsx>{`
                * {
                    font-family: Hack
                }
            `}
            </style>
        </div>
    )
}
