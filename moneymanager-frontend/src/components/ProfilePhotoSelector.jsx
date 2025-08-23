import { useState, useRef } from "react";
import { Trash, Upload, User } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="relative w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
                    <User className="text-purple-500" size={35} />
                    {/* Upload button bottom-right corner */}
                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary rounded-full absolute bottom-0 right-0 transform translate-x-1 translate-y-1"
                    >
                        <Upload size={15} className="text-black" />
                    </button>

                </div>
            ) : (
                <div className="relative w-20 h-20">
                    <img
                        src={previewUrl}
                        alt="profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Remove button bottom-right corner */}
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute bottom-0 right-0 transform translate-x-1 translate-y-1"
                    >
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
