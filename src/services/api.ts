export interface Version {
  name: string
  selected: boolean
}

export async function fetchVersions(): Promise<Version[]> {
  try {
    const tabs = await new Promise<any>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, resolve)
    })
    const currentTabUrl = tabs[0].url
    const includeVjshi = ['.vjshi.cn', '.vjshi.net']
    if (includeVjshi.some((item) => currentTabUrl.includes(item))) {
      const response = await fetch('https://www.vjshi.cn/')
      const html = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const metaTag = doc.querySelector('meta[name="versions"]')

      if (metaTag && metaTag.getAttribute('content')) {
        const versionsContent = metaTag.getAttribute('content') || ''
        const list = JSON.parse(versionsContent)
        localStorage.setItem('versions', JSON.stringify(list))
        return list
      }
    }
    return []
  } catch (error) {
    console.error('Error fetching versions:', error)
    return []
  }
}

export const fetchUser = async (uid: string) => {
  const response = await fetch(
    `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjg/mgmt/user/login?uid=${uid}`,
  )
  const data = await response.json()
  return data.data
}

export const deleteFoto = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjf/foto/list',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { fid } = item
      const options = {
        url: `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjf/foto/del-by-id?fid=${fid}&pinCode=${pinCode}`,
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
      return fetch(options.url, options)
    }),
  )
}

export const deleteMusic = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjm/music/seller/list-new',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjm/music/seller/delete-new?id=${id}&pinCode=${pinCode}`,
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
      return fetch(options.url, options)
    }),
  )
}

export const deleteVideo = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjh/video/list',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { vid } = item
      const options = {
        url: `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjh/video/del-by-id?vid=${vid}&pinCode=${pinCode}`,
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
      return fetch(options.url, options)
    }),
  )
}

export const deleteCases = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjk/share-cases/uid/cases',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjk/share-cases/delete`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          caseId: id,
          pin: pinCode,
        }),
      }
      return fetch(options.url, options)
    }),
  )
}

export const deleteStudio = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjk/cases/user/cases',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjk/cases/delete`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          caseId: id,
          pin: pinCode,
        }),
      }
      return fetch(options.url, options)
    }),
  )
}

export const adminLogin = async () => {
  const response = await fetch(
    'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com/vjg/mgmt/auth/admin-login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'xxxxxx',
      }),
    },
  )

  const data = await response.json()
  return data.data
}
