import { ChangeEvent, useCallback, useState } from "react"
import { INote } from "../../interfaces/note"
import Editor from "../editor/Editor"
import Preview from "../preview/Preview"
import TagList from "../tagList/TagList"
import { NoteDetailsCurrentElementContextProvider } from "./CurrentElementIndexContext"
import useNoteDetailsKeybind from "./useNoteDetailsKeybind"

interface Props {
  className?: string
  currentNote: INote | null
  isActive: boolean
  onDocChange?: (doc: string) => void
  onTitleChange?: (title: string) => void
  onFinishEditTitle?: () => void
  onTagsChange?: (tags: string[]) => void
  onMouseEnter?: () => void
  onBlur?: () => void
}

const NoteDetails = ({
  className,
  currentNote,
  isActive,
  onDocChange,
  onTitleChange,
  onTagsChange,
  onFinishEditTitle,
  onMouseEnter,
  onBlur
} : Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)

  const numberOfElements = 3

  const [
    currentElementIndex, setCurrentElementIndex,
    currentTagIndex, setCurrentTagIndex,
    isEditingTag, setIsEditingTag,
    isEditingSingleTag, setIsEditingSingleTag
  ] = useNoteDetailsKeybind({
    isActive,
    isEditMode,
    isEditingTitle,
    numberOfElements,
    numberOfTags: currentNote ? currentNote.tags.length : 0,
    onFinishEditTitle,
    onBlur,
    setIsEditMode,
    setIsEditingTitle
  })

  const handleDocChange = useCallback((newDoc: string) => {
    onDocChange && onDocChange(newDoc)
  }, [currentNote])

  function handleOnClick () {
    setIsEditingTitle(true)
    setCurrentElementIndex(0)
  }

  const handleOnBlur = useCallback(() => {
    onFinishEditTitle && onFinishEditTitle()
    setIsEditingTitle(false)
  }, [onFinishEditTitle])

  const handleTitleChange = useCallback((e: ChangeEvent) => {
    onTitleChange && onTitleChange((e.target as HTMLInputElement).value)
  }, [onTitleChange])

  const handleTagsChange = useCallback((tags: string[]) => {
    onTagsChange && onTagsChange(tags)
  }, [onTagsChange])

  const handleEnterNodeDetails = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  function handleMouseLeave () {
    setCurrentElementIndex(0)
    setCurrentTagIndex(0)
    setIsEditingSingleTag(false)
    setIsEditingTag(false)
    setIsEditMode(false)
    setIsEditingTitle(false)
  }

  function handleEditBody () {
    setIsEditMode(true)
    setCurrentElementIndex(numberOfElements)
  }

  function handleEditorOnBlur () {
    setIsEditMode(false)
  }

  return (
    <div className={`${className} px-2 pt-2 bg-zinc-800 text-white`} onMouseEnter={handleEnterNodeDetails} onMouseLeave={handleMouseLeave}>
      {
        !currentNote ?
        <div className="flex justify-center items-center h-full text-gray-400">
          <div className="flex flex-col items-center">
            <div className="w-12">
              <img src="/src/assets/imgs/notebook.png" alt="notebook"/>
            </div>
            <div className="mt-4">Create a new note or select a note and craft on</div>
          </div>
        </div> :
        <div>
          <div className="flex flex-row gap-x-10 items-center w-full cursor-pointer" onClick={handleOnClick}>
            {
              isEditingTitle ?
              <input
                defaultValue={currentNote.title}
                className="focus:outline-none bg-transparent w-full placeholder-white focus:placeholder-white"
                onBlur={handleOnBlur}
                onChange={handleTitleChange}
                autoFocus
              /> :
              <div className={`${currentElementIndex === 0 ? 'text-blue-300' : ''} text-xl hover:text-blue-300`}>{currentNote.title}</div>
            }
          </div>
          <NoteDetailsCurrentElementContextProvider
            currentTagIndex={currentTagIndex} setCurrentTagIndex={setCurrentTagIndex}
            isEditingTag={isEditingTag} setIsEditingTag={setIsEditingTag}
            isEditingSingleTag={isEditingSingleTag} setIsEditingSingleTag={setIsEditingSingleTag}
          >
            <TagList
              className={`mt-2 ${currentElementIndex === 1 && !isEditingTag ? 'text-blue-300' : ''}`}
              tags={currentNote.tags}
              onFinishEditTags={handleTagsChange}
            />
          </NoteDetailsCurrentElementContextProvider>
          <div className="mt-5">
            {
              isEditMode ?
                <Editor
                  initialDoc={currentNote?.body ? currentNote.body : ''}
                  docKey={currentNote?.id ? `${currentNote.id}` : ''}
                  onChange={handleDocChange}
                  onBlur={handleEditorOnBlur}
                /> :
                <Preview
                  className={`${currentElementIndex === numberOfElements - 1 ? 'text-blue-300' : ''} cursor-pointer hover:text-blue-300`}
                  onClick={handleEditBody}
                  doc={currentNote?.body ? currentNote.body : ''}
                />
            }
          </div>
        </div>
      }
    </div>
  )
}

export default NoteDetails