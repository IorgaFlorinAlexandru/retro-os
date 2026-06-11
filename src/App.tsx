import './App.css'
import {ContextMenuProvider} from "./contexts/MenuContext.tsx";
import Explorer from "./os/explorer/containers/Explorer.tsx";
import {SettingsProvider} from "./contexts/SettingsContext.tsx";
import {ClipboardProvider} from "./contexts/ClipboardContext.tsx";

function App() {

  return (
      <SettingsProvider>
          <ClipboardProvider>
              <ContextMenuProvider>
                  <Explorer></Explorer>
              </ContextMenuProvider>
          </ClipboardProvider>
      </SettingsProvider>
  )
}

export default App
