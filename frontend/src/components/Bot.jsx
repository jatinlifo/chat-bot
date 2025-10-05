import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AiOutlineUser } from 'react-icons/ai';


const url = import.meta.env.VITE_BACKEND_URL; 



function Bot() {

    
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messageEndRef = useRef(null);

    // scrool karna ka liye
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior:'smooth'});
    }, [messages])

    const handleSendMessage = async () => {
        console.log("Hii i am a input", input);
        if (!input.trim()) return;
        //pehla user ka message chat me add kiya
        setMessages((prev) => [...prev, {text: input, sender: "user"}]);
        const userMessage = input;
        setInput("");
        setLoading(true);
        try {
            const response = await axios.post(url, {
                text: userMessage
            });
            console.log("Backend response:", response.data);
            if (response.status === 200) {
                setMessages((prevMessages) => [...prevMessages, 
                    { text: response.data.botMessage,  sender: 'bot'}
                ]);
            }
        } catch (error) {
            console.log("Error sending message", error);
            setMessages((prev) => [
                ...prev,
                {text: "Error contacting server", sender: "bot"}
            ]);
        }
        setLoading(false);
    };
    return (
        <div className='flex flex-col h-screen'>
            {/* header  */}
            <nav className='w-full'>
                <div className='bg-gray-700 text-white flex justify-between px-9 py-5'>
                    <h1 className='text-2xl  font-extrabold font-logo'>My ChatBot</h1>
                    <div className='text-3xl border-2 rounded-full cursor-pointer'>
                        <AiOutlineUser />
                    </div>
                </div>
            </nav>
            <main className='bg-gray-900  flex-1  p-6 space-y-3 
            sc'>
                <div className='pb-23 space-y-6'>
                    
                    {messages.length === 0 && (
                        <h1 className='flex justify-center text-white  mt-40 text-4xl font-bold text-center font-rubik'>
                           Hii 👋, How can help you
                        </h1>
                    )}
                    {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-3xl max-w-max ${
                            msg.sender === "user" ?
                            'bg-gray-300  text-black ml-auto font-rubik' :
                            'bg-gray-700 text-white md:mr-auto mr-13 font-rubik'
                          }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messageEndRef}></div>
                </div>
            </main>
            <footer className='px-5 py-4  fixed bottom-0 left-0 right-0 '>
                <div className='px-5 w-full md:w-5/6 mx-auto flex  bg-gray-600  rounded-full'>
                    <input
                    type='text'
                    placeholder='Search'
                    value={input}
                    className=' w-full px-5 outline-none text-white font-semibold text-lg'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                     />
                    <button className={`bg-gray-100 font-bold py-3 px-5  rounded-full
                      ${input.trim() ? 
                      "bg-gray-100 cursor-pointer"
                      :"bg-gray-500 cursor-not-allowed"
                    }`} 
                       
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    >
                      {loading ? "...": "Send"}
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default Bot       