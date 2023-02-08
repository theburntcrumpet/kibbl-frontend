import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkMermaid from 'remark-mermaid-plugin';

interface Props {
    path:string
}

export default function Markdown(props:Props) {
    const [markdownData, setMarkdownData] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/notes/data`, {params: { f: props.path }})
        .then((response) => {
            setMarkdownData(response.data);
        });
    },[props.path]);
    if (props.path === ""){
        return (<div />);
    }
    return(
        <ReactMarkdown>
            {markdownData}
        </ReactMarkdown>
    );
}