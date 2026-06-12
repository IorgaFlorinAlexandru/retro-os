import './App.css'
import {ContextMenuProvider} from "./contexts/MenuContext.tsx";
import Explorer from "./os/explorer/containers/Explorer.tsx";
import {SettingsProvider} from "./contexts/SettingsContext.tsx";
import {ClipboardProvider} from "./contexts/ClipboardContext.tsx";
import {DesktopProvider} from "./os/explorer/contexts/DesktopContext.tsx";
import {StorageProvider} from "./contexts/StorageContext.tsx";

function App() {

  return (
      <SettingsProvider>
          <ClipboardProvider>
              <ContextMenuProvider>
                  <StorageProvider>
                      <DesktopProvider>
                          <Explorer></Explorer>
                      </DesktopProvider>
                  </StorageProvider>
              </ContextMenuProvider>
          </ClipboardProvider>
      </SettingsProvider>
  )
}

export default App
