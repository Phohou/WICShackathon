"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, List, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

declare var webkitSpeechRecognition: any
declare var SpeechRecognition: any

export default function VoiceAIPage() {
    const [listening, setListening] = useState(false)
    const [speaking, setSpeaking] = useState(false)
    const [aiResponse, setAiResponse] = useState("")
    const [userInfo, setUserInfo] = useState<Record<string, string>>({})
    const [showProperties, setShowProperties] = useState(false)
    const recognitionRef = useRef<any>(null)
    const synthRef = useRef<SpeechSynthesis | null>(null)
  
    useEffect(() => {
      // Initialize speech recognition and synthesis
      if (typeof window !== "undefined") {
        synthRef.current = window.speechSynthesis
  
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
          recognitionRef.current = new SpeechRecognition()
          recognitionRef.current.continuous = true
          recognitionRef.current.interimResults = true
  
          recognitionRef.current.onresult = (event: any) => {
            const current = event.resultIndex
            const result = event.results[current]
            const transcriptText = result[0].transcript
  
            if (result.isFinal) {
              processUserInput(transcriptText)
            }
          }
  
          recognitionRef.current.onend = () => {
            if (listening) {
              recognitionRef.current?.start()
            }
          }
        }
      }
  
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
        if (synthRef.current) {
          synthRef.current.cancel()
        }
      }
    }, [listening])
  
    const toggleListening = () => {
      if (listening) {
        setListening(false)
        recognitionRef.current?.stop()
      } else {
        setListening(true)
        recognitionRef.current?.start()
        // Initial greeting
        if (Object.keys(userInfo).length === 0) {
          setTimeout(() => {
            speakText("Hello! I'm your voice assistant. Tell me about yourself, and I'll remember what you share.")
          }, 1000)
        }
      }
    }
  
    const speakText = (text: string) => {
      if (synthRef.current) {
        setSpeaking(true)
        setAiResponse(text)
  
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onend = () => {
          setSpeaking(false)
        }
  
        synthRef.current.speak(utterance)
      }
    }
  
    const processUserInput = (input: string) => {
      const lowerInput = input.toLowerCase()
  
      const nameMatch = lowerInput.match(/my name is (\w+)/i)
      const ageMatch = lowerInput.match(/i am (\d+) years old/i)
      const locationMatch = lowerInput.match(/i (live|am from) (\w+)/i)
  
      const newInfo = { ...userInfo }
      let infoGathered = false
  
      if (nameMatch && nameMatch[1]) {
        newInfo.name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1)
        infoGathered = true
      }
  
      if (ageMatch && ageMatch[1]) {
        newInfo.age = ageMatch[1]
        infoGathered = true
      }
  
      if (locationMatch && locationMatch[2]) {
        newInfo.location = locationMatch[2].charAt(0).toUpperCase() + locationMatch[2].slice(1)
        infoGathered = true
      }
  
      setUserInfo(newInfo)
  
      if (infoGathered) {
        const responses = [
          "Thanks for sharing that information with me.",
          "I've noted that down.",
          "I'll remember that about you.",
          "Got it! I've updated your profile.",
        ]
  
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        speakText(randomResponse)
      } else if (lowerInput.includes("what do you know about me")) {
        if (Object.keys(newInfo).length > 0) {
          let knowledgeResponse = "Here's what I know about you: "
  
          if (newInfo.name) knowledgeResponse += `Your name is ${newInfo.name}. `
          if (newInfo.age) knowledgeResponse += `You are ${newInfo.age} years old. `
          if (newInfo.location) knowledgeResponse += `You live in ${newInfo.location}. `
  
          speakText(knowledgeResponse)
        } else {
          speakText("I don't know anything about you yet. Please share some information with me.")
        }
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        speakText("Hello! I'm listening. Tell me about yourself.")
      } else {
        speakText("I heard you. How can I help?")
      }
    }
  
    const toggleProperties = () => {
      setShowProperties(!showProperties)
    }
  
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/loading.tsx'); 
    };

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
                  onClick={toggleListening}
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
  