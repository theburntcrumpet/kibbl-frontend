import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { TreeView } from '@mui/lab';

interface Props {
    files : string[]
}

interface TreeNode {
    name: string;
    fullPath: string;
    uuid: number;
    children?: TreeNode[];
  }
  
function pathsToTree(paths: string[]): TreeNode {
    const root: TreeNode = { name: '/', children: [], fullPath: "/", uuid: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)  };
    paths.forEach(path => {
        const parts = path.split('/').filter(part => part !== '');
        let node: TreeNode = root;
        parts.forEach(part => {
            let child = node.children?.find(child => child.name === part);
            if (!child) {
                child = { name: part, fullPath: path, uuid: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) };
                if (!node.children) {
                node.children = [];
                }
                node.children.push(child);
            }
            node = child;
            });
    });
    return root;
}


export default function FileTree(props:Props) {
    const fileTree:TreeNode = pathsToTree(props.files);
    const renderTree = (nodes: TreeNode[]) => (
        <TreeItem key={nodes[0].uuid.toString()} nodeId={nodes[0].uuid.toString()} label={nodes[0].name} >
          {Array.isArray(nodes[0].children)
            ? nodes[0].children.map((node) => renderTree([node]))
            : null}
        </TreeItem>
      );
    return (
        <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto', height: 1024 }}
    >
            {fileTree.children !== undefined ? renderTree(fileTree.children) : ""}
        </TreeView>
    );
}