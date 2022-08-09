import InputHint from "../../components/inputHint/InputHint"
import { possibleNoteDetailsStates, focusOptions } from "../../constants/noteDetails"

interface Props {
  currentNoteDetailsState: possibleNoteDetailsStates
  currentFocus: focusOptions
}
const useNoteDetailsHints = ({ currentNoteDetailsState, currentFocus }: Props) => {
  function getKeybindingHints () {
    if (currentFocus === focusOptions.notelist) return <NotelistKeyHints/>
    else {
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
      }
    }
  }
  return {
    getKeybindingHints
  }
}

export default useNoteDetailsHints

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
        <div className="ml-1 text-xs">: Undo</div>
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
        <InputHint label="Esc"/>
        <div className="ml-1 text-xs">: Undo</div>
      </div>
      <div className="flex items-center">
        <InputHint label="Enter"/>
        <div className="ml-1 text-xs">: Save title</div>
      </div>
    </>
  )
}