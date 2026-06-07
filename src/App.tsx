import './App.css'
import Desktop from "./os/explorer/components/Desktop.tsx";
import {ContextMenuProvider} from "./contexts/MenuContext.tsx";

function App() {

  return (
    <ContextMenuProvider>
        <Desktop></Desktop>
    </ContextMenuProvider>
  )
}

export default App
