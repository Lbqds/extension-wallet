import { useEffect, useState } from 'react'
import create from 'zustand'

import { messageStream } from '../shared/messages'

interface State {
  error?: string
  isLoading: boolean
  isFirstRender: boolean
}

export const useAppState = create<State>(() => ({
  isLoading: true,
  isFirstRender: true
}))

export const useLoadingProgress = () => {
  const [progress, setProgress] = useState<number>()

  useEffect(() => {
    messageStream.subscribe(([message]) => {
      if (message.type === 'LOADING_PROGRESS') {
        setProgress(message.data >= 1 ? undefined : message.data)
      }
    })
  }, [])

  return { progress, clearProgress: () => setProgress(undefined) }
}
