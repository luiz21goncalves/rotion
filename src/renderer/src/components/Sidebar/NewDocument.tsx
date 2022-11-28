import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { QUERY_KEYS } from '@/shared/constants/query-keys'
import type { Document } from '@/shared/types/ipc'

export function NewDocument() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: createDocument, isLoading: isCreatingNewDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument()

        return response.data
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData<Document[]>(
            [QUERY_KEYS.DOCUMENTS.FETCH_ALL],
            (documents) => {
              if (documents && documents?.length >= 0) {
                return [...documents, data]
              }

              return [data]
            },
          )

          navigate(`/documents/${data.id}`)
        },
      },
    )

  function handleCreateDocument() {
    createDocument()
  }

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }

    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      disabled={isCreatingNewDocument}
      onClick={handleCreateDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
