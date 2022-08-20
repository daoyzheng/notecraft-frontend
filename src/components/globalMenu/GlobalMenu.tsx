import { observer } from "mobx-react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { menuFocusOptions } from "../../constants/globalMenu"
import { INotebook } from "../../interfaces/note"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookStore from "../../store/NotebookStore"
import { notebooksMock } from "../../utils/mock"
import NotebookItem from "../notebookItem/NotebookItem"
import GlobalMenuItem from "./GlobalMenuItem"
import { NotebookListContainer } from "./GlobalMenuItem.styled"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

interface Props {
}

const GlobalMenu = observer(({}: Props) => {
  const [currentFocus, setCurrentFocus] = useState<menuFocusOptions>(menuFocusOptions.noteshall)
  const [notebookList, setNotebookList] = useState<INotebook[]>(notebooksMock)
  const notebookListRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore
  const { currentNotebookId } = NotebookStore
  useGlobalMenuKeybind({
    notebookList,
    globalNavigationStore,
    currentFocus,
    notebookListRef,
    setCurrentFocus,
  })
  function handleNotebookClick () {
    setCurrentFocus(menuFocusOptions.notebooks)
  }
  function handleNotesHallClick () {
    setCurrentFocus(menuFocusOptions.noteshall)
  }
  return (
    <div className="justify-between flex flex-col h-full">
      <div>
        <GlobalMenuItem
          isFocused={currentFocus === menuFocusOptions.noteshall}
          onClick={handleNotesHallClick}
        >
          <Link to={routes.noteshall}>Notes Hall</Link>
        </GlobalMenuItem>
        <div className="flex flex-row items-center mt-3 mb-1">
          <GlobalMenuItem
            isFocused={currentFocus === menuFocusOptions.notebooks}
            onClick={handleNotebookClick}
          >
            <Link to={routes.notebooks}>Notebooks</Link>
          </GlobalMenuItem>
          <i className={`${currentFocus === menuFocusOptions.notebooks ? 'text-blue-300' : ''} material-icons-outlined text-sm cursor-pointer`}>add_circle_outline</i>
        </div>
        <NotebookListContainer className="space-y-1 ml-3" ref={notebookListRef}>
          {notebookList.map(notebook => (
            <NotebookItem
              isActive={!!currentNotebookId && currentNotebookId === notebook.id}
              notebook={notebook}
              key={notebook.id}
            />
          ))}
        </NotebookListContainer>
      </div>
      <div>
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu