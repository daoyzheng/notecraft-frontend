import { ChangeEvent, useCallback, useContext } from "react"
import { possibleNoteDetailsStates } from "../../constants/noteDetails"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"
import NoteTag from "../noteTag/NoteTag"

interface Props {
  tags: string[]
  className?: string
  onTagsChange: (tags: string[]) => void
  onFinishEditTags: () => void
}
const TagList = ({ tags, className, onTagsChange, onFinishEditTags }: Props) => {
  const {
    isEditingTag,
    isAddingTag,
    currentTagIndex,
    setCurrentTagIndex,
    setIsEditingTag,
    setIsAddingTag,
    setIsEditingSingleTag,
    setNewTag,
    setCurrentNoteDetailsState,
    setCurrentElementIndex,
    handleFinishAddingNewTag
  } = useContext(NoteDetailsCurrentElementContext)
  function handleNewTagOnChange (e: ChangeEvent) {
    const newTag = (e.target as HTMLInputElement).value
    setNewTag(newTag)
  }

  const handleAddTagBlur = useCallback(() => {
    setIsAddingTag(false)
    setCurrentElementIndex(1)
    tags.splice(tags.length, 1)
    onTagsChange(tags)
    if (tags.length === 0) {
      setIsEditingTag(false)
      setIsEditingSingleTag(false)
      setCurrentNoteDetailsState(possibleNoteDetailsStates.navigating)
    } else
      setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTag)
  },[onTagsChange])
  const handleAddNewTag = useCallback(() => {
    setIsAddingTag(false)
    setIsEditingSingleTag(false)
    handleFinishAddingNewTag()
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTag)
  }, [setIsAddingTag, handleFinishAddingNewTag])
  const isTagFocused = useCallback((index: number) : boolean => {
    return currentTagIndex === index && isEditingTag
  }, [currentTagIndex, isEditingTag])
  const handleOnTagChange = useCallback((tag: string, index: number) => {
    tags[index] = tag
    onTagsChange(tags)
  }, [onTagsChange])
  const handleFinishEditTag = useCallback(() => {
    onFinishEditTags()
  }, [onFinishEditTags])
  function handleAddTag() {
    setCurrentElementIndex(1)
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingSingleTag)
    setCurrentTagIndex(tags.length)
    setIsAddingTag(true)
    setIsEditingTag(true)
  }
  return (
    <div className={`${className} text-xs flex flex-row items-center gap-x-2`}>
      {
        tags.map((tag, index) =>
          <NoteTag
            tag={tag}
            key={index}
            index={index}
            isFocus={isTagFocused(index)}
            onTagChange={handleOnTagChange}
            onFinishEditTag={handleFinishEditTag}
          />
        )
      }
      {
        isAddingTag ?
          <>
            <input
              placeholder="add tag"
              className="focus:outline-none bg-transparent w-fit placeholder-gray-400 focus:placeholder-gray-400 w-12"
              onBlur={handleAddTagBlur}
              onChange={handleNewTagOnChange}
              autoFocus
            />
            <button className="w-5 rounded bg-zinc-600 hover:bg-zinc-700" onMouseDown={handleAddNewTag}>
              <i className="material-icons-outlined text-xs text-green-300 hover:text-green-400">done</i>
            </button>
          </>:
          (
            <div className={`${currentTagIndex === tags.length && isEditingTag ? 'text-blue-300' : ''} italic text-xs cursor-pointer hover:text-blue-300`} onClick={handleAddTag}>
              Add Tag
            </div>
          )
      }
    </div>
  )
}

export default TagList