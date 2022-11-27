import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { QUERY_KEYS } from '@/shared/constants/query-keys'
import { Document as IPCDocument } from '@/shared/types/ipc'

import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(
    [QUERY_KEYS.DOCUMENTS.FETCH, id],
    async () => {
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
    { enabled: Boolean(id) },
  )

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({ title, content, id: id! })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueryData<IPCDocument[]>(
          [QUERY_KEYS.DOCUMENTS.FETCH_ALL],
          (documents) => {
            const updatedDocumentsList = documents?.map((document) => {
              if (document.id === id) {
                return { ...document, title }
              }

              return document
            })

            return updatedDocumentsList
          },
        )
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  function handleContentUpdated({ content, title }: OnContentUpdatedParams) {
    saveDocument({ content, title })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs uppercase">
          Table of Contents
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleContentUpdated}
          />
        )}
      </section>
    </main>
  )
}
