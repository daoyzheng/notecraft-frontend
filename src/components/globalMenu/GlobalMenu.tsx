import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { menuOptions } from "../../constants/globalMenu"
import routes from "../../routes"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import NotebookStore from "../../store/NotebookStore"
import NotebookList from "../notebookList/NotebookList"
import { IconWrapper } from "./GlobalMenu.styled"
import GlobalMenuItem from "./GlobalMenuItem"
import NewNotebookForm from "./NewNotebookForm"
import useGlobalMenuKeybind from "./useGlobalMenuKeybind"

const GlobalMenu = observer(() => {
  const location = useLocation()
  const { notebookList } = NotebookListStore
  const [showNewNotebookForm, setShowNewNotebookForm] = useState<boolean>(false)
  const newNotebookFormRef = useRef<HTMLDivElement>(null)
  const globalNavigationStore = GlobalNavigationStore
  const {
    setCurrentNotebook,
  } = NotebookStore
  const navigate = useNavigate()

  function getFocus () {
    switch (location.pathname) {
      case `/${routes.notebooks}`: {
        return menuOptions.notebookLanding
      }
      case `/${routes.noteshall}`: {
        return menuOptions.noteshall
      }
      default: return menuOptions.noteshall
    }
  }

  useEffect(() => {
    globalNavigationStore.setCurrentFocusedPage(getFocus())
    if (globalNavigationStore.currentFocusedPage !== menuOptions.notebookList) {
      setCurrentNotebook(null)
    }
  }, [globalNavigationStore.currentFocusedPage])

  useGlobalMenuKeybind({
    globalNavigationStore,
    showNewNotebookForm,
    setShowNewNotebookForm,
  })
  function handleNotebookClick () {
    navigate(routes.notebooks)
    globalNavigationStore.setCurrentFocusedPage(menuOptions.notebookLanding)
    setCurrentNotebook(null)
  }
  function handleNotesHallClick () {
    navigate(routes.noteshall)
    globalNavigationStore.setCurrentFocusedPage(menuOptions.noteshall)
  }

  function handleShowNewNotebookForm () {
    setShowNewNotebookForm(!showNewNotebookForm)
  }
  function handleNewNotebookBlur () {
    setShowNewNotebookForm(false)
  }
  function handleCreateNewNotebook () {
    setShowNewNotebookForm(false)
  }
  function handleMinimizeAllNotebooks() {
  }

  return (
    <div className="justify-between flex flex-col h-full">
      <div>
        <GlobalMenuItem
          isFocused={globalNavigationStore.currentFocusedPage === menuOptions.noteshall}
          onClick={handleNotesHallClick}
        >
          <div>Notes Hall</div>
        </GlobalMenuItem>
        <div>
        </div>
        <div className="flex flex-row items-center mt-3 mb-1 relative">
          <GlobalMenuItem
            isFocused={globalNavigationStore.currentFocusedPage === menuOptions.notebookLanding}
            onClick={handleNotebookClick}
          >
            <div>Notebooks</div>
          </GlobalMenuItem>
          <IconWrapper
            size="14"
            marginBottom="1"
            ref={newNotebookFormRef}
            className={`${showNewNotebookForm ? 'bg-green-500' : 'bg-green-600'} material-icons-outlined cursor-pointer rounded-sm hover:bg-green-500`}
            onClick={handleShowNewNotebookForm}
          >add</IconWrapper>
          {
            showNewNotebookForm &&
            <NewNotebookForm
              onBlur={handleNewNotebookBlur}
              blurException={newNotebookFormRef}
              onCreateNewNotebook={handleCreateNewNotebook}
            />
          }
          <IconWrapper
            className="material-icons ml-2 cursor-pointer text-gray-400 rounded-sm border border-gray-400 bg-gray-700 hover:bg-gray-600"
            onClick={handleMinimizeAllNotebooks}
          >minimize</IconWrapper>
        </div>
        <NotebookList notebookList={notebookList}/>
      </div>
      <div className="mb-3">
        Dao Zheng
      </div>
    </div>
  )
})

export default GlobalMenu
