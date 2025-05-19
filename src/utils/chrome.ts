import Cookies from 'js-cookie'
export const getActiveTab = () => {
  return new Promise<any>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      resolve(tabs[0])
    })
  })
}

export const setCookie = async (name: string, value: string) => {
  function getDomain(url: string) {
    try {
      const urlObj = new URL(url)
      const parts = urlObj.hostname.split('.')
      if (parts.length >= 2 && url.includes('www')) {
        // 返回.vjshi.cn格式的域名
        return `.${parts.slice(-2).join('.')}`
      }
      return urlObj.hostname
    } catch (e) {
      console.error('Error parsing URL:', e)
    }
  }

  if (chrome?.cookies) {
    const currentTab = await getActiveTab()
    if (currentTab && currentTab.id) {
      const opt = {
        url: currentTab.url,
        name,
        value,
        domain: getDomain(currentTab.url || ''),
        path: '/',
        expirationDate: Date.now() + 1000 * 60 * 60 * 24 * 30,
      }

      chrome.cookies.set(opt, function (cookie: any) {
        if (cookie) {
          // 刷新当前页面
          chrome.tabs.reload(currentTab.id)
        }
      })
    }
  } else {
    Cookies.set(name, value, {
      domain: getDomain(window.location.href || ''),
      path: '/',
      expires: 30,
    })
    window.location.reload()
  }
}
