import { FC } from "react";
import Chatbot from "../Chat/Chatbot/Chatbot";

const Footer: FC = () => {
    return (
        <div className="bg-gray-300 mt-10 flex justify-between p-6">
            <div className="flex">
                <div>
                    <img
                        className="w-[240px]"
                        src="https://hasuflora.com/resize/155x105/1/upload/hinhanh/logo-hasu-501.png"
                        alt="Logo"
                    />
                    <div className="text-2xl mt-6">
                        Hasu thay bạn trao lời yêu thương !
                    </div>
                    <div className="text-md mt-2">Hoa tươi Hasu được...</div>
                </div>
                <div className="ml-10">
                    <div className="text-2xl font-medium uppercase">
                        Thong tin lien he
                    </div>
                    <ul>
                        <li>dia chi</li>
                        <li>dia chi</li>
                        <li>dia chi</li>
                        <li>dia chi</li>
                    </ul>
                </div>
                <div className="ml-10">
                    <div className="text-2xl font-medium uppercase">
                        dich vu
                    </div>
                    <ul>
                        <li>dia chi</li>
                        <li>dia chi</li>
                        <li>dia chi</li>
                        <li>dia chi</li>
                    </ul>
                </div>
            </div>
            <Chatbot />
        </div>
    );
};

export default Footer;
