import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { NoteDetailsCurrentElementContext } from "../noteDetails/CurrentElementIndexContext"

interface Props {
  tag: string
  index: number
  className?: string
  isFocus?: boolean
  onChange?: (tag: string, index: number) => void
}
const NoteTag = ({ tag, index, className, isFocus, onChange }: Props) => {
  const [isEditingTag, setIsEditingTag] = useState<Boolean>(false)
  const [updatedTag, setUpdatedTag] = useState<string>(tag)
  const {
    setCurrentTagIndex,
    setIsEditingTag: setGlobalEditTag,
    setIsEditingSingleTag,
    isEditingSingleTag,
    currentTagIndex
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
    if (isEditingSingleTag || isEditingTag)
      setupHiddenTag()
  }, [isEditingTag, isEditingSingleTag])

  const handleSaveTag = useCallback(() => {
    onChange && onChange(updatedTag, index)
    setIsEditingTag(false)
    // setIsEditingSingleTag(false)
  }, [onChange, updatedTag])
  function handleTagChange (e: ChangeEvent) {
    const tag = (e.target as HTMLInputElement).value
    tagInputChange(tag)
    setUpdatedTag(tag)
  }
  function tagInputChange (tag: string) {
    if (hiddenTag.current && tagInput.current) {
      hiddenTag.current.innerHTML = tag.replace(/\s/g, '&' + 'nbsp;')
      const hiddenTagStyles = window.getComputedStyle(hiddenTag.current)
      tagInput.current.style.minWidth="5px"
      tagInput.current.style.width = hiddenTagStyles.width
    }
  }
  function handleClick () {
    setIsEditingTag(true)
    setGlobalEditTag(true)
    setIsEditingSingleTag(true)
    setCurrentTagIndex(index)
  }
  return (
    (isEditingSingleTag && currentTagIndex === index) || isEditingTag ?
      <>
        <input
          className="focus:outline-none bg-transparent placeholder-gray-400 focus:placeholder-gray-400"
          onBlur={handleSaveTag}
          onChange={handleTagChange}
          value={updatedTag}
          autoFocus
          ref={tagInput}
        />
        <div ref={hiddenTag}>{updatedTag}</div>
      </> :
      <div className={`${className} ${isFocus ? 'text-blue-300' : ''} hover:text-blue-300 cursor-pointer`} onClick={handleClick}>{updatedTag}</div>
  )
}

export default NoteTag