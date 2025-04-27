import { useState } from "react"
import { useInteractiveField } from "./Helpers"

function PasswordField({ label, extraLabel, name, id, autocomplete, helperText, error, required, value, onChange, disabled, ...props }) {
    const [visible, setVisible] = useState(false)
    const { outerStyle, innerStyle, onMouseOver, onMouseLeave, onFocus, onBlur } = useInteractiveField()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-end text-sm leading-6 text-indigo-900 font-normal">
                <label htmlFor={id} className="block">{label}</label>
                {extraLabel}
            </div>
            <div onMouseEnter={onMouseOver} onMouseLeave={onMouseLeave} className={`border-[3px] rounded-[14px] ${outerStyle}`}>
                <div className={`flex flex-row items-center h-[59px] rounded-[12px] text-landing-primary placeholder:text-gray-400 ${innerStyle}`}>
                    <input
                        type={visible ? 'text' : 'password'}
                        name={name}
                        id={id}
                        autoComplete={autocomplete}
                        onChange={onChange}
                        value={value}
                        required={required}
                        disabled={disabled}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className="flex grow h-full bg-transparent rounded-2xl border-transparent focus:border-transparent focus:ring-0 font-normal text-base"
                        {...props}
                    />
                    <div
                        className="w-min h-min p-[17px] cursor-pointer"
                        onClick={toggleVisibility}
                    >
                        {visible ? (
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.24" d="M11 2.97925C3.66665 2.97925 1.14581 9.16675 1.14581 11.0001C1.14581 12.8334 3.66665 19.0209 11 19.0209C18.3333 19.0209 20.8541 12.8334 20.8541 11.0001C20.8541 9.16675 18.3333 2.97925 11 2.97925Z" fill="#2D215A" />
                                <path d="M13.75 11C13.75 12.5188 12.5188 13.75 11 13.75C9.48122 13.75 8.25 12.5188 8.25 11C8.25 9.48122 9.48122 8.25 11 8.25C12.5188 8.25 13.75 9.48122 13.75 11Z" fill="#2D215A" />
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.24" d="M1.83331 11C1.83331 13.2917 4.58331 18.3334 11 18.3334C13.3723 18.3334 15.2434 17.6442 16.6597 16.6597L5.34027 5.34033C2.92579 7.01873 1.83331 9.55562 1.83331 11Z" fill="#2D215A" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.28031 2.21967C2.98742 1.92678 2.51254 1.92678 2.21965 2.21967C1.92676 2.51256 1.92676 2.98744 2.21965 3.28033L4.20538 5.26606C2.09792 7.04163 1.08331 9.44248 1.08331 11C1.08331 12.3808 1.87736 14.3922 3.47016 16.0463C5.09278 17.7313 7.57611 19.0833 11 19.0833C13.246 19.0833 15.0924 18.5012 16.558 17.6187L18.7196 19.7803C19.0125 20.0732 19.4874 20.0732 19.7803 19.7803C20.0732 19.4874 20.0732 19.0126 19.7803 18.7197L17.19 16.1294L5.8706 4.80996L3.28031 2.21967ZM2.58331 11C2.58331 9.92412 3.38661 7.86664 5.2705 6.33118L8.59837 9.65905C8.37642 10.0557 8.2499 10.5131 8.2499 10.9999C8.2499 12.5187 9.48111 13.7499 10.9999 13.7499C11.4868 13.7499 11.9441 13.6234 12.3408 13.4014L15.4589 16.5196C14.277 17.1596 12.8025 17.5833 11 17.5833C8.00719 17.5833 5.90718 16.4145 4.55064 15.0058C3.16427 13.5661 2.58331 11.9109 2.58331 11ZM8.44035 4.73354C9.20513 4.53276 10.0565 4.41667 11 4.41667C13.9928 4.41667 16.0928 5.58547 17.4493 6.99419C18.8357 8.43388 19.4166 10.0891 19.4166 11C19.4166 11.6486 19.1202 12.7019 18.4076 13.8001C18.3169 13.94 18.2198 14.0799 18.1163 14.219C17.8691 14.5514 17.9381 15.0212 18.2704 15.2684C18.6028 15.5157 19.0726 15.4466 19.3198 15.1143C19.4426 14.9493 19.5579 14.7831 19.666 14.6166C20.4891 13.348 20.9166 12.0143 20.9166 11C20.9166 9.61921 20.1226 7.60779 18.5298 5.95373C16.9072 4.2687 14.4239 2.91667 11 2.91667C9.93229 2.91667 8.95266 3.04821 8.05944 3.28271C7.89169 3.32675 7.72706 3.37441 7.56556 3.42547C7.17061 3.55033 6.95167 3.97172 7.07654 4.36667C7.2014 4.76161 7.62279 4.98056 8.01774 4.85569C8.15565 4.81209 8.29651 4.77131 8.44035 4.73354Z" fill="#2D215A" />
                            </svg>

                        )}
                    </div>
                </div>
            </div>
            {(error || helperText) && (
                <div className={`font-normal text-xs ${error ? 'text-landing-light' : 'text-landing-secondary'} pt-1`}>
                    {error || helperText}
                </div>
            )}
        </div>
    )
}

export default PasswordField