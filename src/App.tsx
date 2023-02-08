import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FileTree from './components/FileTree'
import Markdown from './components/Markdown'
import SearchBox from './components/SearchBox'

function App() {
  const [count, setCount] = useState(0)
  const [selectedFile, setSelectedFile] = useState("");
  const [filePaths, setFilePaths] = useState<string[]>([]);


  console.log(selectedFile);
  console.log(filePaths);
  return (
    <div className="App">
      <SearchBox setFilePaths={setFilePaths}/>
      <FileTree selectedFile={selectedFile} setSelectedFile={setSelectedFile} files={filePaths} />
      <Markdown  path={selectedFile} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
