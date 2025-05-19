import { VersionList } from './components/version-list'
import { UidForm } from './components/uid-form'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
function WinTool() {
  const [open, setOpen] = useState(false)
  const divRef = useRef<any>(null)

  useClickAway(divRef, () => {
    if (open) setOpen(false)
  })

  return (
    <div>
      <div
        className="fixed bottom-0 left-0 w-[30px] h-[30px] bg-black/50 text-white rounded-full flex justify-center items-center z-10"
        onClick={() => setOpen(!open)}
      >
        +
      </div>
      {open && (
        <div
          ref={divRef}
          className="fixed bottom-0 left-0 bg-white p-4 space-y-5 z-[9999] pt-4"
        >
          <div className="min-w-[200px] space-y-4">
            <VersionList />
          </div>
          {/* 分界线组件 */}
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="min-w-[250px]">
            <UidForm />
          </div>
        </div>
      )}
    </div>
  )
}
const ChromeTool = () => {
  return (
    <div className="bg-gray-100 p-4 space-y-5">
      <div className="min-w-[200px] space-y-4">
        <VersionList />
      </div>
      {/* 分界线组件 */}
      <div className="h-[1px] w-full bg-gray-200"></div>
      <div className="min-w-[250px]">
        <UidForm />
      </div>
    </div>
  )
}
const Tool = () => {
  if (chrome.tabs) {
    return <ChromeTool />
  }
  return <WinTool />
}
export default Tool
