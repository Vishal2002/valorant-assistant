import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, PlusCircle } from 'lucide-react'

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How can I assist you today?", isUser: false },
    { id: 2, content: "I have a question about React hooks.", isUser: true },
    { id: 3, content: "Sure, I'd be happy to help with React hooks. What specific question do you have?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage, isUser: true }])
      setInputMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <Button variant="outline" className="w-full mb-4">
          <PlusCircle className="mr-2 h-4 w-4" /> New Chat
        </Button>
        <ScrollArea className="h-[calc(100vh-100px)]">
          {messages.filter(m => m.isUser).map((message) => (
            <div key={message.id} className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <p className="truncate">{message.content}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-white">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e:any) => setInputMessage(e.target.value)}
              className="flex-1 mr-2"
              onKeyPress={(e:any) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}