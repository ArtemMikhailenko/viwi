export default function Tooltip({ children, text, left, bottom }) {
    return (
        <div className="relative group/tooltip">
            {children}
            <div
                className="w-max absolute hidden group-hover/tooltip:flex flex-col items-center font-medium text-xs z-[100]"
                style={{ left, bottom }}
            >
                <span className="relative z-10 py-1 px-2 text-xs leading-[24px] whitespace-no-wrap text-[#6F6690] bg-[#FCFCFF] shadow-lg rounded-[8px] select-none">
                    {text}
                </span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-[#FCFCFF] z-10" />
            </div>
        </div>
    )
}