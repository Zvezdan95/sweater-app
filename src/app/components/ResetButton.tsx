export function ResetButton() {
    return (
        <button type="button" className={
            "px-4 py-1 rounded-2xl " +
            "border-2 border-white border-solid " +
            "text-2xl font-bold text-white " +
            "bg-custom-red-200 hover:bg-custom-red-100 " +
            "transition-colors duration-500"
        }>
            VISSZAÁLLÍTÁS
        </button>
    );
}