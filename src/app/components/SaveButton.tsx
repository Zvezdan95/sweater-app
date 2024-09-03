import React from "react";

interface SaveButtonProps {
    onClick: (e: React.MouseEvent) => void,
    isVisible: boolean
}

export function SaveButton({onClick, isVisible}: SaveButtonProps) {
    return (
        <div className={
            "absolute inset-0 " +
            "flex flex-col items-center justify-center " +
            "transition-transform duration-500 " +
            (isVisible ? "translate-y-0 translate-x-0" : "translate-y-full translate-x-full")}>
            <button type="button"
                    onClick={onClick}
                    className={
                        "px-8 py-2 rounded-full " +
                        "border-2 border-white border-solid " +
                        "shadow-lg shadow-custom-blue-500 " +
                        "text-4xl font-bold text-white " +
                        "bg-custom-blue-450 hover:bg-custom-blue-400 " +
                        "transition-colors duration-500"
                    }>
                ELKÜLDÖM
            </button>
        </div>

    );
}
