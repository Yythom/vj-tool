import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { fetchUser } from '../services/api'
import { setCookie } from '../utils/chrome'
import { useLocalStorage } from 'react-use'
import { Operations } from './operations'

export const UidForm = () => {
  const [cacheUids, setCacheUids] = useLocalStorage<string[]>('uids', [])
  const { mutateAsync } = useMutation({ mutationFn: fetchUser })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelectUid = async (_uid: string) => {
    const { token } = await mutateAsync(_uid)
    if (token) {
      const newUids = new Set(cacheUids!)
      newUids.add(_uid)
      setCacheUids([...newUids])
      setCookie('VJTOKEN', token)
    }
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="请输入uid"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSelectUid(inputRef.current!.value)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          提交
        </button>
      </div>
      {cacheUids!.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-medium mb-2">已保存的UID列表:</h4>
          <ul className="space-y-2">
            {cacheUids!.map((_uid, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-2 rounded-md relative"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleSelectUid(_uid)}
                >
                  <InfoItem uid={_uid} />
                </div>

                <div className="relative group/info">
                  <div>...</div>
                  <div className="fixed top-0 right-0 min-w-48 h-full hidden group-hover/info:block bg-slate-200 z-10">
                    <Operations uid={_uid} />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newUids = new Set(cacheUids!)
                    newUids.delete(_uid)
                    setCacheUids([...newUids])
                  }}
                  className="w-[16px] h-[16px] bg-black text-white text-xs hover:opacity-60 rounded-full absolute right-0 top-0 leading-[16px] text-center"
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const InfoItem = ({ uid }: { uid: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: () => fetchUser(uid),
  })

  return (
    <div className="flex space-x-4 items-center">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        {data?.user && (
          <img
            src={`https://vjshi-personal-picture.oss-cn-shanghai.aliyuncs.com/${data?.user?.avatar}`}
            className="w-full h-full object-cover"
            alt={data?.user?.username}
          />
        )}
      </div>
      <div className="flex space-x-2 items-center">
        <div className="text-gray-500 text-sm">{uid}</div>
        <div className="text-gray-800">{data?.user?.username}</div>
      </div>
    </div>
  )
}
