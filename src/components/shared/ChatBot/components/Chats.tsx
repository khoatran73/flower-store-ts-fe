import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "../styles/Chats.scss";

interface Props {
    userResponse: string;
    botResponse: {
        purpose: string;
        message: string;
        options?: string[];
        sender: string;
    };
    sendUserResponse: string;
    optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface MessagesInfo {
    purpose?: string;
    message: string;
    options?: string[];
    sender: string;
}

const Chats: React.FC<Props> = (props) => {
    const [messages, setMessages] = useState<MessagesInfo[]>([]);
    const dummyRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    // stacking up messages
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    purpose: "introduction",
                    message: "Chào bạn, tên bạn là gì ?",
                    sender: "bot",
                },
            ]);
        } else {
            let tempArray = [...messages];
            tempArray.push({ message: props.sendUserResponse, sender: "user" });
            setMessages(tempArray);

            setTimeout(() => {
                let temp2 = [...tempArray];
                temp2.push(props.botResponse);
                setMessages(temp2);
            }, 1000);
        }
    }, [props.sendUserResponse, props.botResponse]);

    // enable autoscroll after each message
    useEffect(() => {
        if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
            bodyRef.current.scrollTo({
                top: dummyRef.current.offsetTop,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <>
            <div className="bg-gray-500 flex items-center h-[13%]">
                <Avatar
                    className="m-2"
                    alt="Khoa Henry"
                    src="https://avatars.githubusercontent.com/u/77377243?s=400&u=f1135698dedef3ad6fbb056b8f9e4bed4c1a92e0&v=4"
                />
                <div className="ml-1 text-md font-medium text-yellow-100">
                    Chatbot
                </div>
            </div>
            <div className="message-container p-5 h-[75%]" ref={bodyRef}>
                {messages.map((chat) => (
                    <div key={chat.message}>
                        <div className={`message ${chat.sender}`}>
                            <p>{chat.message}</p>
                        </div>
                        {chat.options ? (
                            <div className="options">
                                {chat.options.map((option) => (
                                    <p
                                        onClick={(e) => props.optionClick(e)}
                                        data-id={option}
                                        key={option}
                                    >
                                        {option}
                                    </p>
                                ))}
                            </div>
                        ) : null}
                        <div ref={dummyRef} className="dummy-div"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Chats;
