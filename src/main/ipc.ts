import { ipcMain } from 'electron'
import { randomUUID } from 'node:crypto'

import { IPC } from '@/shared/constants/ipc'
import type {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '@/shared/types/ipc'

import { store } from './store'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, params: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const { id } = params

    const document = store.get(`documents.${id}`) as Document

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (_): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: Document = { id, title: 'Sem Título' }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, params: SaveDocumentRequest): Promise<void> => {
    const { id, title, content } = params

    store.set(`documents.${id}`, { id, title, content })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, params: DeleteDocumentRequest): Promise<void> => {
    const { id } = params

    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`)
  },
)
