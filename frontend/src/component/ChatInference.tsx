import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sword, LogOut, Send, PlusCircle, Users, Map, Shield } from 'lucide-react'

export default function ValorantCoachAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Welcome, Coach! How can I assist you with your Valorant team today?", isUser: false },
    { id: 2, content: "I need help creating a balanced team composition for Haven.", isUser: true },
    { id: 3, content: "For Haven, a balanced team composition could be: Omen (Controller), Sova (Initiator), Killjoy (Sentinel), Jett (Duelist), and Skye (Initiator/Support). This composition provides good map control, information gathering, and both offensive and defensive capabilities. Would you like more details on their roles?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage, isUser: true }])
      setInputMessage("")
      // Here you would typically call an API to get the AI response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, content: "I'm processing your request. As an AI assistant, I'm here to help with Valorant strategies and team compositions. What specific information do you need?", isUser: false }])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <Button variant="outline" className="w-full mb-4 bg-red-600 hover:bg-red-700 text-white border-none">
          <PlusCircle className="mr-2 h-4 w-4" /> New Strategy
        </Button>
        <ScrollArea className="flex-grow">
          <div className="space-y-4">
            <Button className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> Team Composition
            </Button>
            <Button className="w-full justify-start">
              <Map className="mr-2 h-4 w-4" /> Map Strategies
            </Button>
            <Button className="w-full justify-start">
              <Sword className="mr-2 h-4 w-4" /> Agent Abilities
            </Button>
            <Button className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" /> Defense Tactics
            </Button>
          </div>
        </ScrollArea>
        <Button className="w-full justify-start mt-auto">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 rounded-md p-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-red-600' : 'bg-blue-600'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-gray-800">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Ask about Valorant strategies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 mr-2 bg-gray-700 text-white border-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="bg-red-600 hover:bg-red-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}