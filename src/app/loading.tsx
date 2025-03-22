"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/ui/loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call to backend
        const response = await fetch("/api/data")
        const data = await response.json()

        // Once we have a response, set loading to false
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-xl">Data has been loaded successfully.</p>
        </div>
      )}
    </main>
  )
}

