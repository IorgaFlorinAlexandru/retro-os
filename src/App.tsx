import './App.css'
import {ContextMenuProvider} from "./contexts/MenuContext.tsx";
import Explorer from "./os/explorer/containers/Explorer.tsx";

function App() {

  return (
    <ContextMenuProvider>
        <Explorer></Explorer>
    </ContextMenuProvider>
  )
}

export default App
