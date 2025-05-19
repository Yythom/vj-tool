import { useRef, useState } from 'react'
import {
  deleteCases,
  deleteFoto,
  deleteMusic,
  deleteVideo,
  deleteStudio,
  adminLogin,
} from '../services/api'
import Cookies from 'js-cookie'
import { useClickAway } from 'react-use'

// 查看用户主页按钮组件
const ViewProfileButton = ({ uid }: { uid: string }) => {
  const handleViewProfile = () => {
    const url = `https://www.vjshi.cn/profile/${uid}.html`
    window.open(url, '_blank')
  }

  return (
    <button
      className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      onClick={handleViewProfile}
    >
      查看用户主页
    </button>
  )
}

// 管理用户列表按钮组件
const AdminAccessButton = ({ uid }: { uid: string }) => {
  const handleAdminAccess = async () => {
    const url = `https://admin.vjshi.cn/#/users/list?page=1&size=10&uid=${uid}`
    const { token } = await adminLogin()
    if (chrome?.cookies) {
      chrome.cookies.set(
        {
          url: 'https://admin.vjshi.cn',
          name: 'TOKEN',
          value: token,
          domain: 'admin.vjshi.cn',
          path: '/',
        },
        () => {
          window.open(url, 'adminWindow', 'width=1920,height=1080,popup')
        },
      )
    } else {
      Cookies.set('TOKEN', token, {
        domain: 'admin.vjshi.cn',
        path: '/',
      })
      window.open(url, 'adminWindow', 'width=1920,height=1080,popup')
    }
  }

  return (
    <button
      className="w-full px-3 py-2 bg-blue-50 text-white rounded-md"
      onClick={handleAdminAccess}
    >
      管理-用户列表
    </button>
  )
}

// 删除作品表单组件
const DeleteWorksForm = ({ uid }: { uid: string }) => {
  const handleDeleteWorks = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const type = formData.get('type') as string

    const deleteActions: Record<string, () => Promise<any>> = {
      all: () =>
        Promise.all([
          deleteFoto(uid),
          deleteMusic(uid),
          deleteVideo(uid),
          deleteCases(uid),
          deleteStudio(uid),
        ]),
      foto: () => deleteFoto(uid),
      music: () => deleteMusic(uid),
      video: () => deleteVideo(uid),
      cases: () => deleteCases(uid),
      studio: () => deleteStudio(uid),
    }

    if (deleteActions[type]) {
      deleteActions[type]()
    }
  }

  return (
    <form
      className="p-4 flex items-center space-x-2"
      onSubmit={handleDeleteWorks}
    >
      <select
        name="type"
        className="p-2 border border-gray-300 rounded-md w-20"
      >
        <option value="all">全部</option>
        <option value="foto">图片</option>
        <option value="music">音乐</option>
        <option value="video">视频</option>
        <option value="cases">案例</option>
        <option value="studio">原创</option>
      </select>
      <button
        type="submit"
        className="px-2 py-1 bg-blue-50 text-white rounded-md"
      >
        删除作品
      </button>
    </form>
  )
}

// 主操作组件
export const Operations = ({ uid }: { uid: string }) => {
  const [open, setOpen] = useState(false)
  const divRef = useRef<any>(null)

  return (
    <div className="relative">
      <div
        onClick={() => {
          setOpen(!open)
        }}
      >
        ...
      </div>
      {open && (
        <div
          ref={divRef}
          className="fixed top-0 right-0 min-w-48 h-full bg-neutral-50 z-10"
        >
          <div className="p-4 flex justify-end text-3xl">
            <button onClick={() => setOpen(false)}>x</button>
          </div>
          <div>
            <div className="p-4 flex flex-col space-y-3">
              <ViewProfileButton uid={uid} />
              <AdminAccessButton uid={uid} />
            </div>
            <DeleteWorksForm uid={uid} />
          </div>
        </div>
      )}
    </div>
  )
}
