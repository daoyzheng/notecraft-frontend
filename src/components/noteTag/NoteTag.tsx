import { ChangeEvent, MouseEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { possibleNoteDetailsStates } from "../../constants/noteDetails"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"
import { TagInputWrapper } from "./NoteTag.styled"

interface Props {
  tag: string
  index: number
  className?: string
  isFocus?: boolean
  onTagChange?: (tag: string, index: number) => void
  onFinishEditTag?: () => void
}
const NoteTag = ({ tag, index, className, isFocus, onTagChange, onFinishEditTag }: Props) => {
  const [updatedTag, setUpdatedTag] = useState<string>(tag)
  const {
    isEditingSingleTag,
    originalTag,
    currentTagIndex,
    isShakeTag,
    setIsAddingTag,
    setCurrentTagIndex,
    setIsEditingTag: setGlobalEditTag,
    setOriginalTag,
    setIsEditingSingleTag,
    setCurrentElementIndex,
    setCurrentNoteDetailsState,
    handleDeleteTag,
    setIsShakeTag
  } = useContext(NoteDetailsCurrentElementContext)
  const tagInput = useRef<HTMLInputElement>(null)
  const hiddenTag = useRef<HTMLDivElement>(null)

  const setupHiddenTag = useCallback(() => {
    if (hiddenTag.current) {
      hiddenTag.current.style.position = 'absolute'
      hiddenTag.current.style.top = '0'
      hiddenTag.current.style.left = '-9999px'
      hiddenTag.current.style.overflow = 'hidden'
      hiddenTag.current.style.visibility = 'hidden'
      hiddenTag.current.style.whiteSpace = 'nowrap'
      hiddenTag.current.style.height = '0'
      if (tagInput.current) {
        const styles = window.getComputedStyle(tagInput.current)
        hiddenTag.current.style.fontFamily = styles.fontFamily;
        hiddenTag.current.style.fontSize = styles.fontSize;
        hiddenTag.current.style.fontStyle = styles.fontStyle;
        hiddenTag.current.style.fontWeight = styles.fontWeight;
        hiddenTag.current.style.letterSpacing = styles.letterSpacing;
        hiddenTag.current.style.textTransform = styles.textTransform;

        hiddenTag.current.style.borderLeftWidth = styles.borderLeftWidth;
        hiddenTag.current.style.borderRightWidth = styles.borderRightWidth;
        hiddenTag.current.style.paddingLeft = styles.paddingLeft;
        hiddenTag.current.style.paddingRight = styles.paddingRight;
      }
    }
    tagInputChange(updatedTag)
  }, [updatedTag])

  useEffect(() => {
    if (isEditingSingleTag)
      setupHiddenTag()
  }, [isEditingSingleTag])

  useEffect(() => {
    setUpdatedTag(tag)
  }, [tag])

  let shakeTagTimeout: any
  const handleSaveTag = useCallback((e?: MouseEvent) => {
    if (!updatedTag.trim()) {
      if (e)
        e.preventDefault()
      clearTimeout(shakeTagTimeout)
      setIsShakeTag(true)
      shakeTagTimeout = setTimeout(() => setIsShakeTag(false), 400)
    } else {
      setIsEditingSingleTag(false)
      setIsAddingTag(false)
      setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTag)
      onFinishEditTag && onFinishEditTag()
    }
  },[onFinishEditTag])

  const handleBlurTag = () => {
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingTag)
    onTagChange && onTagChange(originalTag, index)
    setIsEditingSingleTag(false)
  }

  const handleDeleteCurrentTag = useCallback(() => {
    handleDeleteTag(index)
  }, [handleDeleteTag])

  function handleTagChange (e: ChangeEvent) {
    const tag = (e.target as HTMLInputElement).value
    tagInputChange(tag)
    setUpdatedTag(tag)
    onTagChange && onTagChange(tag, index)
  }
  function tagInputChange (tag: string) {
    if (hiddenTag.current && tagInput.current) {
      hiddenTag.current.innerHTML = tag.replace(/\s/g, '&' + 'nbsp;')
      const hiddenTagStyles = window.getComputedStyle(hiddenTag.current)
      tagInput.current.style.minWidth="10px"
      tagInput.current.style.width = hiddenTagStyles.width
    }
  }

  function handleClick () {
    setCurrentNoteDetailsState(possibleNoteDetailsStates.editingSingleTag)
    setOriginalTag(tag)
    setGlobalEditTag(true)
    setIsEditingSingleTag(true)
    setCurrentTagIndex(index)
    setCurrentElementIndex(1)
  }
  return (
    (isEditingSingleTag && currentTagIndex === index) ?
      <>
        <TagInputWrapper isShakeTag={isShakeTag}>
          <input
            className="focus:outline-none bg-transparent placeholder-gray-400 focus:placeholder-gray-400"
            onBlur={handleBlurTag}
            onChange={handleTagChange}
            value={updatedTag}
            autoFocus
            ref={tagInput}
          />
          <button className="w-5 rounded bg-zinc-600 hover:bg-zinc-700 ml-2" onMouseDown={handleSaveTag}>
            <i className={`material-icons-outlined text-xs ${isShakeTag? 'text-red-300 hover:text-red-400' : 'text-green-300 hover:text-green-400'}`}>done</i>
          </button>
        </TagInputWrapper>
        <div ref={hiddenTag}>{updatedTag}</div>
      </> :
      <div className={`${className} flex items-center gap-x-1`}>
        <div className={`${isFocus ? 'text-blue-300' : ''} hover:text-blue-300 cursor-pointer flex items-center gap-x-1`} onClick={handleClick}>
          <div className="mt-1">
            <i className="material-icons-outlined text-xs">local_offer</i>
          </div>
          <div>{updatedTag}</div>
        </div>
        <div className="mt-1 cursor-pointer" onClick={handleDeleteCurrentTag}>
          <i className="text-red-300 material-icons text-xs hover:text-red-200">clear</i>
        </div>
      </div>
  )
}

export default NoteTag