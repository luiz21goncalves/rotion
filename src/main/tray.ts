import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

import { IPC } from '@/shared/constants/ipc'

export function createTry(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate.png'),
  )

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send(IPC.DOCUMENTS.NEW)
      },
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Documento teste 1',
      accelerator: 'CmdOrCtrl+1',
      click: () => {
        console.log('Documento 1')
      },
    },
    {
      label: 'Documento teste 2',
      accelerator: 'CmdOrCtrl+2',
      click: () => {
        console.log('Documento 2')
      },
    },
    {
      label: 'Documento teste 3',
      accelerator: 'CmdOrCtrl+3',
      click: () => {
        console.log('Documento 3')
      },
    },
    { type: 'separator' },
    { label: 'Sair do Rotion', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
