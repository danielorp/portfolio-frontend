import localforage from 'localforage'

localforage.config({
  driver: [localforage.LOCALSTORAGE, localforage.INDEXEDDB],
  name: 'portfolio',
  storeName: 'portfolio_keys'
})

export default localforage