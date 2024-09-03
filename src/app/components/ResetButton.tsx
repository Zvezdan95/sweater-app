import React from "react";

export function ResetButton({onClick}: {onClick: (e: React.MouseEvent) => void}) {
    return (
        <button type="button"
                onClick={onClick}
                className={
            "px-4 py-1 rounded-2xl w-64 mb-16 mt-8 " +
            "border-2 border-white border-solid " +
            "text-2xl font-bold text-white " +
            "bg-custom-red-200 hover:bg-custom-red-100 " +
            "transition-colors duration-500"
        }>
            VISSZAÁLLÍTÁS
        </button>
    );
}