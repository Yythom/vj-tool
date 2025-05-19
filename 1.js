// ==UserScript==
// @name         vjshi-tool
// @namespace    http://tampermonkey.net/
// @version      2025-05-14
// @description  try to take over the world!
// @author       You
// @match        *://*.vjshi.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bing.com
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  const scripts = {
    'cookie-switcher': {
      src: 'https://cdn.jsdelivr.net/gh/yuhang1995/cookie-switcher-js@1.0.0/cookie-switcher.iife.js',
    },
    vconsole: {
      src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js',
      onload: function () {
        var vConsole = new window.VConsole()
      },
      onerror: function (e) {
        console.error('vconsole 加载失败', e)
      },
    },
  }
  Object.entries(scripts).forEach(([key, value]) => {
    const script = document.createElement('script')
    const { src, ...rest } = value
    script.src = src
    Object.keys(rest).forEach((key) => {
      script[key] = rest[key]
    })
    document.head.appendChild(script)
  })
})()
