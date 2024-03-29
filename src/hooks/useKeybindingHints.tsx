import { useParams } from "react-router-dom"
import InputHint from "../components/inputHint/InputHint"
import { menuOptions } from "../constants/globalMenu"
import { possibleNoteDetailsStates, focusOptions } from "../constants/noteDetails"
import { IDirectoryItem } from "../interfaces/note"
import GlobalNavigationStore from "../store/GlobalNavigationStore"
import NotebookListStore from "../store/NotebookListStore"
import NotebookStore from "../store/NotebookStore"

const useKeybindingHints = () => {
  const {
    isInGlobalMenu,
    currentFocusedPage
  } = GlobalNavigationStore
  const {
    currentNote,
    notebookCurrentFocus,
    currentNoteDetailsState
  } = NotebookStore
  const {
    currentItem
  } = NotebookListStore
  const { itemId } = useParams()
  function getKeybindingHints () {
    if (isInGlobalMenu) {
      if (currentFocusedPage === menuOptions.notebookList) {
        return <NotebookSelectionHints currentItem={currentItem} routeItemId={itemId}/>
      }
      return <GlobalMenuHints/>
    }
    else {
      switch(currentFocusedPage) {
        case menuOptions.notebookList: {
          if (notebookCurrentFocus === focusOptions.notelist) return <NotelistKeyHints/>
          else if (currentNote) {
            switch(currentNoteDetailsState) {
              case possibleNoteDetailsStates.navigating: {
                return <NoteDetailsNavigatingHints/>
              }
              case possibleNoteDetailsStates.editingTitle: {
                return <NoteDetailsEditingTitleHints/>
              }
              case possibleNoteDetailsStates.editingTag: {
                return <NoteDetailsEditingTagHints/>
              }
              case possibleNoteDetailsStates.editingSingleTag: {
                return <NoteDetailsEditingSingleTagHints/>
              }
              case possibleNoteDetailsStates.editingBody: {
                return <NoteDetailsEditingBodyHints/>
              }
            }
          }
        }
      }
    }
  }
  return {
    getKeybindingHints
  }
}

export default useKeybindingHints

const NotelistKeyHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="i"/>
        <div className="ml-1 text-xs">: New Note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="l"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_right"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit Note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev note</div>
      </div>
      <div className="flex items-center">
        <InputHint label="h"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_left"/>
        <div className="ml-1 text-xs">: Return to notebooks selection</div>
      </div>
    </>
  )
}

const NoteDetailsNavigatingHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="i"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit segment</div>
      </div>
      <div className="flex items-center">
        <InputHint label="h"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_left"/>
        <div className="ml-1 text-xs">: Return to notes selection</div>
      </div>
    </>
  )
}

const NoteDetailsEditingTitleHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Save title</div>
      </div>
    </>
  )
}

const NoteDetailsEditingTagHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="l"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_right"/>
        <div className="ml-1 text-xs">: Next tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="h"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_left"/>
        <div className="ml-1 text-xs">: Prev tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="i"/><span className="mx-1">/</span><InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Edit tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="x"/><span className="mx-1">/</span><InputHint label="Del"/>
        <div className="ml-1 text-xs">: Delete tag</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
    </>
  )
}

const NoteDetailsEditingSingleTagHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Exit</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Save tag</div>
      </div>
    </>
  )
}

const NoteDetailsEditingBodyHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Save doc</div>
      </div>

    </>
  )
}

const GlobalMenuHints = () => {
  return (
    <>
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next page</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev page</div>
      </div>
      <div className="flex items-center">
        <InputHint label="i"/>
        <div className="ml-1 text-xs">: New notebook</div>
      </div>
    </>
  )
}

const NotebookSelectionHints = ({ currentItem, routeItemId }: { currentItem: IDirectoryItem|null, routeItemId: string|undefined}) => {
  return (
    <div className="flex gap-x-3 flex-wrap gap-y-1">
      <div className="flex items-center">
        <InputHint label="j"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_down"/>
        <div className="ml-1 text-xs">: Next item</div>
      </div>
      <div className="flex items-center">
        <InputHint label="k"/><span className="mx-1">/</span><InputHint icon="keyboard_arrow_up"/>
        <div className="ml-1 text-xs">: Prev item</div>
      </div>
      {
        currentItem && !currentItem.isFolder &&
        <div className="flex items-center">
          <InputHint label="l"/>
          <span className="mx-1">/</span>
          <InputHint icon="keyboard_arrow_right"/>
          <span className="mx-1">/</span>
          <InputHint label="Enter"/>
          <div className="ml-1 text-xs">
            { routeItemId && currentItem.id === Number(routeItemId) 
            ? ': Enter notes selection'
            : ': Select notebook'}
          </div>
        </div>
      }
      <div className="flex items-center">
        <InputHint label="i"/>
        <div className="ml-1 text-xs">: New notebook</div>
      </div>
      {
        currentItem && currentItem.isFolder &&
        <div className="flex items-center">
          <InputHint label="Enter"/>
          <div className="ml-1 text-xs">: Toggle Expand</div>
        </div>
      }
    </div>
  )
}