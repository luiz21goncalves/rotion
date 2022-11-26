import Store from 'electron-store'

type StoreType = {
  documents: Record<string, unknown>
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
})
