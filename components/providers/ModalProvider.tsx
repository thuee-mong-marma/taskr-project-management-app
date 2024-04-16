'use client'

import { CardModal } from "../modals/CardModal/Modal"
import { useEffect, useState } from "react"

export const ModalProvider = () => {
  const [isMounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <CardModal />
  )
}