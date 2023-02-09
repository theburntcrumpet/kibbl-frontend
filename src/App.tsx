import { Container, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material'
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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container sx={{minHeight:"100vh"}} disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={6} xl={4}>
            <SearchBox setFilePaths={setFilePaths} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <FileTree selectedFile={selectedFile} setSelectedFile={setSelectedFile} files={filePaths} searchTerm={searchTerm}/>
          </Grid>
          <Grid item xs={6} xl={8}>
            <Markdown  path={selectedFile} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
