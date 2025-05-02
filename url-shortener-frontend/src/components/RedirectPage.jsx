"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const RedirectPage = () => {
  const { shortCode } = useParams()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(3)
  const [destinationUrl, setDestinationUrl] = useState("https://example.com/very-long-destination-url-path")

  useEffect(() => {
    // In a real app, you would fetch the destination URL based on the shortCode
    // For demo purposes, we're using a hardcoded URL

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // In a real app, you would redirect to the actual destination
          // window.location.href = destinationUrl
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [shortCode])

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowRight className="text-gray-600" />
          </div>
        </div>

        <h2 className="text-xl font-medium text-gray-700 mb-6">You are being redirected...</h2>

        <div className="bg-gray-100 rounded-md p-3 mb-4 text-left">
          <div className="mb-2">
            <div className="text-sm text-gray-500">Short URL</div>
            <div className="text-sm font-medium">https://short.ly/{shortCode}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Destination</div>
            <div className="text-sm font-medium truncate">{destinationUrl}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Redirecting in {countdown} seconds...</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-800 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(countdown / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleCancel}
          className="w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default RedirectPage
