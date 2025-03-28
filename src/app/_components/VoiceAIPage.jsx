"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, List, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import Vapi from "@vapi-ai/web";

export default function VoiceAIPage() {
    const [listening, setListening] = useState(false)
    const [speaking, setSpeaking] = useState(false)
    const [showProperties, setShowProperties] = useState(false)
    const userInfo = {}

    const statusDisplay = document.getElementById("status");
    const speakerDisplay = document.getElementById("speaker");
    const volumeDisplay = document.getElementById("volume");
    const vapiTyping = document.getElementById("vapiTyping");
    const vapiStatusMessage = document.getElementById("vapiStatusMessage");
    const chatWindow = document.getElementById("chat");
    
    const vapi = new Vapi("42b3d91d-dcf1-40af-ad12-ccb17a1316ad");
    
    let connected = false;
    let assistantIsSpeaking = false;
    let volumeLevel = 0;
    let callActive = false;
    const maxSpread = 30; // Maximum spread of the shadow in pixels
    
    // Vapi Event Listeners
    vapi.on("call-start", function () {
      connected = true;
      updateUI();
    });
    
    vapi.on("call-end", function () {
      connected = false;
      updateUI();
  
    });
    
    vapi.on("speech-start", function () {
      assistantIsSpeaking = true;
      updateUI();
    });
    
    vapi.on("speech-end", function () {
      assistantIsSpeaking = false;
      updateUI();
    });
    
    vapi.on("message", (message) => {
      if (message.type === "function-call") {
        // If the ChangeColor function was calles
        if (message.functionCall && message.functionCall.name === "ChangeColor") {
          // Don't forget to sanitzie the values when building this in a real application
        }
    
        // If the ChangeColor function was calles
        if (message.functionCall && message.functionCall.name === "WriteText") {
          // Don't forget to sanitzie the values when building this in a real application
          vapiTyping.textContent = message.functionCall.parameters.Text;
        }
      }
    
      // Adds a message to the background chat
      if (message.type === "conversation-update") {
        updateChat(message);
      }
    });
    
    vapi.on("volume-level", function (level) {
      volumeLevel = level; // Level is from 0.0 to 1.0
    
      // Calculate the spread directly based on the volume level
      const spread = volumeLevel * maxSpread;
    
      volumeDisplay.textContent = `Volume: ${volumeLevel.toFixed(3)}`; // Display up to 3 decimal places for simplicity
    });
    
    vapi.on("error", function (error) {
      connected = false;
    
      if (error.error.message) {
        vapiStatusMessage.textContent = error.error.message;
      }
      updateUI();
    });
    
    function updateChat(conversationUpdate) {
      chatWindow.innerHTML = ""; // Clear the chat window before adding new messages
    
      conversationUpdate.conversation.forEach((message) => {
        var messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
    
        // Add specific class based on the role
        switch (message.role) {
          case "assistant":
            messageDiv.classList.add("assistant");
            break;
          case "user":
            messageDiv.classList.add("user");
            break;
          case "tool": // You might want a different style for tool responses
            messageDiv.classList.add("tool");
            break;
        }
    
        // Set text content and handle tool calls if they exist
        if (message.content) {
          messageDiv.textContent = message.content;
        } else if (message.tool_calls && message.tool_calls.length > 0) {
          // Example: Append a generic message or handle differently
          messageDiv.textContent = "Processing request...";
        }
    
        chatWindow.appendChild(messageDiv);
      });
    
      // Scroll to the bottom of the chat window
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    
    function updateUI() {
      // Update the status
      statusDisplay.textContent = `Status: ${connected ? "Connected" : "Disconnected"}`;
    
      // Update the speaker
      speakerDisplay.textContent = `Speaker: ${assistantIsSpeaking ? "Assistant" : "User"}`;
    }
    
  
    const toggleListening = () => {
      if (listening) {
        setListening(false)
        callActive = false;
        vapi.stop();
      } else {
        setListening(true)
        callActive = true;
        vapi.start("a82827c7-bdef-4762-a82b-9b64e642a2e4");
        if (Object.keys(userInfo).length === 0) {
          setTimeout(() => {}, 1000)
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




    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-8">NestCents Voice</h1>
  
              <div
                className={`speech-bubble relative p-5 rounded-2xl mb-8 w-full transition-all duration-300 ${speaking ? "bg-primary/10" : ""}`}
              >
                <div
                  className={`absolute w-4 h-4 transform rotate-45 bg-inherit -top-2 left-1/2 -translate-x-1/2 transition-all duration-300 ${speaking ? "bg-primary/10" : "bg-slate-100"}`}
                ></div>
  
                <p className="text-center min-h-[50px]">
                  {listening ? "Listening..." : "Tap the microphone and start speaking..."}
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
  
              <div className="callVapi flex gap-4">
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
                  <ChevronUp className="h-6 w-6" />
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
                      Click on the microphone to talk to our bot and answer its questions.
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>
      </main>
    )
  }
  