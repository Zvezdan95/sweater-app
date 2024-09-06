import React from "react";

interface SaveButtonProps {
    onClick: (e: React.MouseEvent) => void,
    isVisible: boolean
    lastRequestAt: number | null | undefined
}

export function SaveButton({onClick, isVisible, lastRequestAt}: SaveButtonProps) {
    let buttonDisabled = false;
    if (lastRequestAt !== null) {
        const minutesPassedSinceLastRequest = minutesSince(lastRequestAt);
        if (minutesPassedSinceLastRequest < 10) {
            buttonDisabled = true;
        }
    }
    return (
        <div className={
            "absolute inset-0 " +
            "flex flex-col items-center justify-center " +
            "transition-transform duration-500 " +
            (isVisible ? "translate-y-0 translate-x-0" : "translate-y-full translate-x-full")}>
            <button type="button"
                    onClick={onClick}
                    disabled={buttonDisabled}
                    title={buttonDisabled ? `Please wait ${lastRequestAt ? Math.round(10 - minutesSince(lastRequestAt)) : 0} minutes before next submission` : ""}
                    className={
                        "px-8 py-2 rounded-full " +
                        "border-2 border-white border-solid " +
                        "shadow-lg shadow-custom-blue-500 " +
                        "text-4xl font-bold text-white " +
                        "bg-custom-blue-450 hover:bg-custom-blue-400 disabled:opacity-75 disabled:hover:bg-custom-blue-450 " +
                        "transition-colors duration-500"
                    }>
                ELKÜLDÖM
            </button>
        </div>

    );
}


function minutesSince(posixTimestamp: number | null | undefined): number {
    if (typeof posixTimestamp === "number") {
        const now = Date.now();
        const millisecondsElapsed = now - posixTimestamp;

        return millisecondsElapsed / (1000 * 60);
    }

    return 0;
}