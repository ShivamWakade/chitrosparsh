"use client"
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const userMessage: Message = { text: inputText, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputText('');
      handleBotResponse(inputText.toLowerCase());
    }
  };

  const handleBotResponse = (userMessage: string) => {
    let botMessage: Message = { text: '', sender: 'bot' };

    if (userMessage.includes('hi') || userMessage.includes('hello')) {
      botMessage.text = 'Hi there!';
    } else if (userMessage.includes('time')) {
      const time = new Date().toLocaleTimeString();
      botMessage.text = `The current time is ${time}.`;
    } else {
      botMessage.text = "I'm sorry, I didn't understand that.";
    }

    setTimeout(() => {
      setMessages([...messages, botMessage]);
    }, 500); // Simulating bot response time
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }}

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseChatBot = () => {
    setIsOpen(false);
  };
  

  return (
    <div className={` ${isOpen ? 'fixed bottom-0 right-0 m-4 p-4 rounded-lg shadow-lg bg-blue-500 h-96' : 'fixed bottom-0 right-0 m-4 p-4 rounded-lg '}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex justify-center items-center cursor-pointer" onClick={toggleChatBot}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </div>
        <div className="text-white font-bold">ChatBot</div>
      </div>
      {isOpen && (
        <div className="flex flex-col space-y-2 h-full">
          <div className="chat-container flex flex-col-reverse space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'text-right text-white' : 'text-left text-white'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container flex">
            <input
              className=" flex-1 rounded-l-lg px-4 py-2"
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="rounded-r-lg px-4 py-2 bg-white text-blue-500 hover:bg-blue-100"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
