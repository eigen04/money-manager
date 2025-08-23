import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
                   label,
                   value,
                   onChange,
                   placeholder,
                   type = "text",
                   isSelect = false,
                   options = []
               }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="mb-4">
            {/* Label */}
            {label && (
                <label className="text-[13px] text-slate-800 block mb-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Dropdown Input */}
                {isSelect ? (
                    <select
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        {/* Normal Input */}
                        <input
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            type={
                                type === "password"
                                    ? showPassword
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />

                        {/* Toggle Password Icon */}
                        {type === "password" && (
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={togglePassword}
                            >
                {showPassword ? (
                    <Eye size={20} className="text-purple-800" />
                ) : (
                    <EyeOff size={20} className="text-slate-400" />
                )}
              </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;
