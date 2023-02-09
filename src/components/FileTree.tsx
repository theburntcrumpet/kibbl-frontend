import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { TreeView } from '@mui/lab';

interface Props {
  files: string[],
  selectedFile: string,
  setSelectedFile: (selectedFile: string) => void,
  searchTerm: string
}

interface FilenameID {
  filename: string,
  id: string;
}

interface TreeNode {
  name: string;
  fullPath: string;
  uuid: number;
  children?: TreeNode[];
  fileIds?: FilenameID[]; // root node contains list of files with their node ID 
  allIds?: string[]; // root node contains all ids so that we can expand/collapse all
}

function pathsToTree(paths: string[]): TreeNode {
  const rootUuid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const root: TreeNode = { name: '/', children: [], fullPath: "/", allIds: [rootUuid.toString()], uuid: rootUuid, fileIds: [] };
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

        if (part == parts[parts.length - 1]) {
          root.fileIds?.push({ filename: path, id: child.uuid.toString() })
        }
        root.allIds?.push(child.uuid.toString());
        node.children.push(child);
      }
      node = child;
    });
  });
  return root;
}

export default function FileTree(props: Props) {
  const renderTree = (nodes: TreeNode[]) => (
    <TreeItem key={nodes[0].uuid.toString()} nodeId={nodes[0].uuid.toString()} id={nodes[0].uuid.toString()} label={nodes[0].name} >
      {Array.isArray(nodes[0].children)
        ? nodes[0].children.map((node) => renderTree([node]))
        : null}
    </TreeItem>
  );
  const fileTree = pathsToTree(props.files);
  const expandedNodes = fileTree.allIds as string[];
  const treeItems = (fileTree.children as TreeNode[]).map(node => renderTree([node]));


  const selectFile = function (event: React.SyntheticEvent, nodeId: string): void {
    const indexInExpanded = expandedNodes.indexOf(nodeId);
    if (indexInExpanded === -1) {
      expandedNodes.push(nodeId);
    } else {
      expandedNodes.splice(indexInExpanded, 1);
    }

    if (fileTree.fileIds === undefined)
      return;
    const filename = fileTree.fileIds.find((f) => f.id.toString() === nodeId)?.filename;
    if (filename === undefined)
      return;
    props.setSelectedFile(filename);
  };

  const test = (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expandedNodes}
      onNodeSelect={selectFile}
      sx={{ flexGrow: 1, overflowX: 'auto', overflowY: 'scroll', height: "90vh", maxWidth: "100%", padding: "1em" }}
    >
      {treeItems}
    </TreeView>


  )

  return test;
  ;
}