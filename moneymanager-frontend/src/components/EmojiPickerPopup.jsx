import { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Handle emoji selection
    const handleEmojiClick = (emojiData) => {
        onSelect(emojiData?.imageUrl || emojiData?.emoji || "");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12" />
                    ) : (
                        <Image />
                    )}
                </div>
                <p className="text-sm text-gray-700">
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {/* Emoji Picker Popup */}
            {isOpen && (
                <div className="relative">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-10 cursor-pointer"
                    >
                        <X size={16} />
                    </button>

                    {/* Emoji Picker Component */}
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;
