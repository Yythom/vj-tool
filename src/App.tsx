import { VersionList } from './components/version-list'
import { UidForm } from './components/uid-form'

function App() {
  return (
    <div className="min-w-[200px] min-h-[200px] bg-gray-100 p-4 space-x-10 flex justify-between">
      <div className="min-w-[200px] space-y-4">
        <VersionList />
      </div>
      <div className="min-w-[250px]">
        <UidForm />
      </div>
    </div>
  )
}

export default App
