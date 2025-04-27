import { useId } from "react"

export default function Error({ text, onClose }) {
    const id = useId()

    const onClickClose = () => {
        onClose()
    }

    return (
        <div className="absolute flex justify-center w-full" style={{ bottom: 0 }}>
            <div id={id} className="flex items-center w-max max-w-[1000px] p-4 mb-[10px] text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.0578 1.51905C14.5583 2.19657 15.6989 4.23343 17.9802 8.30717L18.3375 8.9452C20.5304 12.8611 21.6268 14.819 21.4434 16.4223C21.2834 17.8211 20.5411 19.0876 19.3988 19.9107C18.0896 20.854 15.8455 20.854 11.3575 20.854H10.6429C6.15479 20.854 3.91076 20.854 2.6015 19.9107C1.45923 19.0876 0.716899 17.8211 0.556889 16.4223C0.373486 14.819 1.46993 12.8611 3.66281 8.94521L4.02011 8.30718L4.02011 8.30718C6.30141 4.23344 7.44206 2.19657 8.94256 1.51905C10.2507 0.928383 11.7496 0.928383 13.0578 1.51905ZM11.7501 8.24989C11.7501 7.83568 11.4144 7.49989 11.0001 7.49989C10.5859 7.49989 10.2501 7.83568 10.2501 8.24989V11.9166C10.2501 12.3308 10.5859 12.6666 11.0001 12.6666C11.4144 12.6666 11.7501 12.3308 11.7501 11.9166V8.24989ZM11.0001 13.9166C10.3328 13.9166 9.79181 14.4575 9.79181 15.1249C9.79181 15.7922 10.3328 16.3332 11.0001 16.3332C11.6675 16.3332 12.2085 15.7922 12.2085 15.1249C12.2085 14.4575 11.6675 13.9166 11.0001 13.9166Z" fill="#6B6BFF" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                    {text}
                </div>
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                    aria-label="Close"
                    onClick={onClickClose}
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
