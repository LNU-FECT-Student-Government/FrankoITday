import { Route, Routes } from "react-router"
import Home from "./components/pages/Home.tsx"
import Console from "./components/pages/Console.tsx"
import FileSystemEditor from "./components/pages/FilleSystemEditor.tsx"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<Console />} />
        <Route path="/edit" element={<FileSystemEditor />} />
      </Routes>
    </>
  )
}

export default App
