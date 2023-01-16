/// <reference types="vite/client" />

declare module '@lit-protocol/sdk-browser'
declare module 'accessControl'

interface Window {
  ethereum?: any
}
