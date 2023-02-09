import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import FileTree from './components/FileTree'
import Markdown from './components/Markdown'
import SearchBox from './components/SearchBox'

function App() {
  const [count, setCount] = useState(0)
  const [selectedFile, setSelectedFile] = useState("");
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  return (
    
    <Container sx={{minHeight:"100vh"}} disableGutters maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={4} xl={6}>
          <SearchBox setFilePaths={setFilePaths} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <FileTree selectedFile={selectedFile} setSelectedFile={setSelectedFile} files={filePaths} searchTerm={searchTerm}/>
        </Grid>
        <Grid item xs={8} xl={6}>
          <Markdown  path={selectedFile} />
        </Grid>
      </Grid>
      
    </Container>
  )
}

export default App
