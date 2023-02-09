import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkMermaid from 'remark-mermaid-plugin';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Props {
    path: string
}

export default function Markdown(props: Props) {
    const [markdownData, setMarkdownData] = useState("");
    useEffect(() => {
        if (props.path === "") {
            return;
        }
        axios.get(`http://localhost:8000/api/v1/notes/data`, { params: { f: props.path } })
            .then((response) => {
                setMarkdownData(response.data);
            });
    }, [props.path]);
    if (props.path === "") {
        return (<div />);
    }
    return (
        <Card
            sx={{ minHeight: "94vh", margin: "1em", }} raised>
            <CardContent>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[[remarkMermaid, { theme: "dark" }], remarkGfm]}>
                    {markdownData}
                </ReactMarkdown>
            </CardContent>
        </Card>

    );
}