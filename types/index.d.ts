import Vue, { Component } from 'vue'

type Params = {
  key: string
  version?: string
  libraries?: Array<string>
}

export const VMap: Component
export const VMarker: Component

type defaultObject = { install(Vue: Vue, params: Params): void }

export default defaultObject
