import * as Collapsible from '@radix-ui/react-collapsible'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'

import { QUERY_KEYS } from '@/shared/constants/query-keys'
import { Document } from '@/shared/types/ipc'

import * as Breadcrumbs from './Breadcrumbs'

type HeaderProps = {
  isSidebarOpen: boolean
}

export function Header(props: HeaderProps) {
  const { isSidebarOpen } = props

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: isDeletingDocument } = useMutation(
    async () => {
      await window.api.deleteDocument({ id: id! })
    },
    {
      onSuccess: () => {
        queryClient.setQueriesData<Document[]>(
          [QUERY_KEYS.DOCUMENTS.FETCH_ALL],
          (documents) => {
            if (documents && documents.length >= 0) {
              const filteredDocumentList = documents.filter(
                (document) => document.id !== id,
              )

              return filteredDocumentList
            }
          },
        )

        navigate('/')
      },
    },
  )

  const isMacOS = process.platform === 'darwin'

  function handleDeleteDocument() {
    mutateAsync()
  }

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Sem Título</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              onClick={handleDeleteDocument}
              disabled={isDeletingDocument}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-60"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
