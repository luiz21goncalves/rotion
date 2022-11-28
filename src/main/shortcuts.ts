import { BrowserWindow, globalShortcut, app } from 'electron'

import { IPC } from '../shared/constants/ipc'

export function createShortcuts(window: BrowserWindow) {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CmdOrCtrl+N', () => {
      window.webContents.send(IPC.DOCUMENTS.NEW)
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}
