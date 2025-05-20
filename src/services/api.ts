export interface Version {
  name: string
  selected: boolean
}
const baseUrl = () => {
  if (window.location.origin.includes('vjshi'))
    return 'http://alb-qtjrjlj7p6s63het87.cn-shanghai.alb.aliyuncs.com'
  return 'http://nixx.natapp1.cc'
}

export async function fetchVersions(): Promise<Version[]> {
  try {
    let currentTabUrl = ''
    if (chrome?.tabs) {
      const tabs = await new Promise<any>((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
      })
      currentTabUrl = tabs[0].url
    } else {
      currentTabUrl = document.location.href
    }
    console.log(currentTabUrl)

    const includeVjshi = ['.vjshi.cn', '.vjshi.net', 'localhost', '192.']
    if (includeVjshi.some((item) => currentTabUrl.includes(item))) {
      const response = await fetch(
        chrome?.tabs ? 'https://www.vjshi.cn/' : location.origin,
      )
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
  const response = await fetch(`${baseUrl()}/vjg/mgmt/user/login?uid=${uid}`)
  const data = await response.json()
  return data.data
}

export const deleteFoto = async (uid: any, pinCode: any = 107801) => {
  const { token } = await fetchUser(uid)
  const response = await fetch(`${baseUrl()}/vjf/foto/list`, {
    headers: {
      Authorization: token,
    },
  })
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { fid } = item
      const options = {
        url: `${baseUrl()}/vjf/foto/del-by-id?fid=${fid}&pinCode=${pinCode}`,
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
  const response = await fetch(`${baseUrl()}/vjm/music/seller/list-new`, {
    headers: {
      Authorization: token,
    },
  })
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `${baseUrl()}/vjm/music/seller/delete-new?id=${id}&pinCode=${pinCode}`,
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
  const response = await fetch(`${baseUrl()}/vjh/video/list`, {
    headers: {
      Authorization: token,
    },
  })
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { vid } = item
      const options = {
        url: `${baseUrl()}/vjh/video/del-by-id?vid=${vid}&pinCode=${pinCode}`,
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
  const response = await fetch(`${baseUrl()}/vjk/share-cases/uid/cases`, {
    headers: {
      Authorization: token,
    },
  })
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `${baseUrl()}/vjk/share-cases/delete`,
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
  const response = await fetch(`${baseUrl()}/vjk/cases/user/cases`, {
    headers: {
      Authorization: token,
    },
  })
  const responseData = await response.json()
  const list = responseData?.data?.data

  await Promise.all(
    list.map((item: any) => {
      const { id } = item
      const options = {
        url: `${baseUrl()}/vjk/cases/delete`,
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
  const response = await fetch(`${baseUrl()}/vjg/mgmt/auth/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'xxxxxx',
    }),
  })

  const data = await response.json()
  return data.data
}
