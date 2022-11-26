import { ipcMain } from 'electron'

import { IPC } from '@/shared/constants/ipc'
import type { FetchAllDocumentsResponse } from '@/shared/types/ipc'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: '1', title: 'Rotion', content: '<h1>Rotion App<h1>' },
        { id: '2', title: 'Notion', content: '<h1>Notion App<h1>' },
        { id: '3', title: 'Discord', content: '<h1>Discord App<h1>' },
        { id: '4', title: 'Slack', content: '<h1>SlackApp<h1>' },
        { id: '5', title: 'Telegram', content: '<h1>Telegram App<h1>' },
        { id: '6', title: 'Peek', content: '<h1>Peek App<h1>' },
      ],
    }
  },
)
