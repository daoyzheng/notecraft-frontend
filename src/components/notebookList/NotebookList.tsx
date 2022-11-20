import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { menuOptions } from "../../constants/globalMenu"
import { IDirectoryItem } from "../../interfaces/note"
import GlobalNavigationStore from "../../store/GlobalNavigationStore"
import NotebookListStore from "../../store/NotebookListStore"
import DirectoryTree from "../directoryTree/DirectoryTree"
import useNotebookListKeybind from "./NotebookListKeybind"

interface Props {
  notebookList: IDirectoryItem[]
}
const NotebookList = observer(({ notebookList }: Props) => {
  const { currentItem, setCurrentItem } = NotebookListStore
  const globalNavigationStore = GlobalNavigationStore
  const notebookListStore = NotebookListStore
  useEffect(() => {
    if (globalNavigationStore.currentFocusedPage === menuOptions.notebookList && !currentItem) {
      setCurrentItem(notebookList[0])
    }
  }, [globalNavigationStore.currentFocusedPage])
  useNotebookListKeybind({
    notebookListStore,
    notebookList,
    currentItem,
    setCurrentItem,
    globalNavigationStore
  })
  return (
    <DirectoryTree directoryItems={notebookList} selectedItem={currentItem}/>
  )
})

export default NotebookList
