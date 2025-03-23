"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, List, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import {vapi, startAssistant, stopAssistant} from "../ai"

declare var webkitSpeechRecognition: any
declare var SpeechRecognition: any

function VoiceAIPage() {
    const [started, setStatred] = useState(false)
    const [loading, setLoading] = useState(false)
    const [assisntIsSpeaking, setAssistantIsSpeaking] = useState(false)
    const [volumeLevel, setVolumeLevel] = useState(0)
    const [callId, setcallId] = useState("")
    const [callResult, setCallResult] = useState(null)
    const [loadingResult, setLoadingResult] = useState(false)

    useEffect(() => {
      vapi.on("call-start", () => { 
        setLoading(false)
        setStatred(true)
      }).on("call-end", () => {
        setStatred(false)
        setLoading(false)
      }).on("speech-start", () => {
        setAssistantIsSpeaking(true)
      }).on("speech-end", () => {
        setAssistantIsSpeaking(false)
      }).on("volume-level", (level) => {
        setVolumeLevel(level)
      })
    }, [])

    const [listening, setListening] = useState(false)
    const [speaking, setSpeaking] = useState(false)
    const [aiResponse, setAiResponse] = useState("")
    const [userInfo, setUserInfo] = useState<Record<string, string>>({})
    const [showProperties, setShowProperties] = useState(false)
    const recognitionRef = useRef<any>(null)
    const synthRef = useRef<SpeechSynthesis | null>(null)
  
    const toggleListening = () => {
      if (listening) {
        setListening(false)
        recognitionRef.current?.stop()
      } else {
        setListening(true)
        recognitionRef.current?.start()
        if (Object.keys(userInfo).length === 0) {
          setTimeout(() => {
          }, 1000)
        }
      }
    }
  
    const toggleProperties = () => {
      setShowProperties(!showProperties)
    }
  
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/loading.tsx'); 
    };

    const handleStart = async () => {
      setLoading(true)
      const data = await startAssistant()
      setcallId(data.id)
    }

    const handleStop = () => {
      stopAssistant()
      //get call details
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-8">Voice AI</h1>
  
              <div
                className={`speech-bubble relative p-5 rounded-2xl mb-8 w-full transition-all duration-300 ${speaking ? "bg-primary/10" : ""}`}
              >
                <div
                  className={`absolute w-4 h-4 transform rotate-45 bg-inherit -top-2 left-1/2 -translate-x-1/2 transition-all duration-300 ${speaking ? "bg-primary/10" : "bg-slate-100"}`}
                ></div>
  
                <p className="text-center min-h-[50px]">
                  {speaking ? aiResponse : listening ? "Listening..." : "Tap the microphone and start speaking..."}
                </p>
  
                <div className={`flex justify-center mt-2 ${speaking || listening ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${speaking ? "bg-primary" : ""} animate-pulse`}
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="flex gap-4">
                <Button
                  onClick={handleStart}
                  className={`rounded-full w-16 h-16 ${listening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"}`}
                  size="icon"
                >
                  {listening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                </Button>
  
                <Button
                  onClick={toggleProperties}
                  variant="outline"
                  className="rounded-full h-16 w-16"
                  size="icon"
                >
                  {showProperties ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <List className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  onClick={handleClick}
                  variant="outline"
                  className="rounded-full h-16 w-16"
                  size="icon"
                  >
                  </Button>
              </div>
  
              {/* Properties Display - Only shows actual properties */}
              {showProperties && (
                <div className="w-full mt-8 pt-6 border-t transition-all duration-300">
                  {Object.keys(userInfo).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(userInfo).map(([key, value]) => (
                        <div key={key} className="p-3 rounded-lg">
                          <div className="text-xs uppercase tracking-wider mb-1">{key}</div>
                          <div className="font-medium">{value}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      No properties gathered yet. Try saying "My name is Alex" or "I am 30 years old".
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>
      </main>
    )
  }
  
  export default VoiceAIPage