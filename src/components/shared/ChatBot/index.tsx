import SendIcon from "@mui/icons-material/Send";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import Chats from "./components/Chats";
import { analyzeNextSteps } from "./config/Helper";
import "./styles/Chatbot.scss";

interface ResponseBotObject {
    purpose: string;
    message: string;
    options?: string[];
    sender: string;
}

const Chatbot: React.FC = () => {
    const [userResponse, setUserResponse] = useState<string>("");
    const [step, setStep] = useState<number>(0);
    const [botResponse, setBotResponse] = useState<ResponseBotObject>({
        purpose: "",
        message: "",
        sender: "bot",
    });
    const [sendUserResponse, setSendUserResponse] = useState<string>("");

    // setting next step when there's response and option click
    const setNextStep = (response: string) => {
        setStep((prevState) => prevState + 1);
        setSendUserResponse(response);
        let res = analyzeNextSteps(step, response);
        setBotResponse({ ...res, sender: "bot" });
        setUserResponse("");
    };

    const optionClick = (e: React.MouseEvent<HTMLElement>) => {
        let option = e.currentTarget.dataset.id;
        if (option) {
            setNextStep(option);
        }
    };

    // event handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserResponse(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userResponse) return;
        setNextStep(userResponse);
    };

    return (
        <div className="chat-container bg-white">
            <Chats
                userResponse={userResponse}
                botResponse={botResponse}
                sendUserResponse={sendUserResponse}
                optionClick={optionClick}
            />
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex items-center justify-between mx-3 mb-2 h-[10%]"
            >
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                    }
                    value={userResponse}
                    variant="outlined"
                    size="small"
                    className="w-[85%]"
                    placeholder="Aa..."
                />
                <button type="submit">
                    <IconButton color="primary" component="span">
                        <SendIcon />
                    </IconButton>
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
