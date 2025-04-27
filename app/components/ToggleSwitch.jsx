import { useId } from "react"

export default function ToggleSwitch({ name, value, setValue, disabled, ariaControls, ...props }) {
    const id = useId()

    const onChange = (e) => {
        setValue(e.target.checked);
    }

    return (
        <div className={`flex items-center ${disabled ? 'opacity-30 select-none cursor-wait' : ''}`}>
            <div className="form-switch">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    className="sr-only"
                    checked={value}
                    onChange={onChange}
                    disabled={disabled}
                    aria-controls={ariaControls}
                    {...props}
                />
                <label
                    className={`${value ? 'bg-[#8470FF]' : 'bg-gray-400'} dark:bg-gray-700`}
                    htmlFor={id}
                    aria-controls={ariaControls}
                >
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Switch</span>
                </label>
            </div>
        </div>
    )
}