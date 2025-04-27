import { twMerge } from "tailwind-merge"
import { useInteractiveField } from "./Helpers"

function Field({
    label,
    extraLabel,
    type,
    name,
    id,
    autocomplete,
    helperText,
    error,
    required,
    value,
    onChange,
    disabled,
    multiline,
    inputClassName,
    innerClassName,
    outerClassName,
    onBlur: propsOnBlur,
    ...props
}) {
    const { outerStyle, innerStyle, onMouseOver, onMouseLeave, onFocus, onBlur } = useInteractiveField();

    const handleBlur = (e) => {
        onBlur(e);
        if (propsOnBlur) propsOnBlur(e);
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-end text-sm leading-6 text-indigo-900 font-normal">
                <label htmlFor={id} className="block">{label}</label>
                {extraLabel}
            </div>
            <div
                onMouseEnter={onMouseOver}
                onMouseLeave={onMouseLeave}
                className={twMerge(
                    'border-[3px] rounded-[14px]',
                    outerStyle,
                    outerClassName,
                )}
            >
                <div className={twMerge(
                    'flex flex-row items-center rounded-[12px] text-landing-primary placeholder:text-gray-400',
                    multiline ? '' : 'h-[59px]',
                    innerStyle,
                    innerClassName,
                )}>
                    {multiline ? (
                        <textarea
                            name={name}
                            id={id}
                            autoComplete={autocomplete}
                            onChange={onChange}
                            value={value}
                            required={required}
                            disabled={disabled}
                            onFocus={onFocus}
                            onBlur={handleBlur}
                            className={twMerge(
                                'block w-full h-full bg-transparent rounded-2xl border-transparent focus:border-transparent focus:ring-0 font-normal text-base text-landing-primary placeholder:text-gray-400 resize-none',
                                inputClassName,
                            )}
                            {...props}
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            id={id}
                            autoComplete={autocomplete}
                            onChange={onChange}
                            value={value}
                            required={required}
                            disabled={disabled}
                            onFocus={onFocus}
                            onBlur={handleBlur}
                            className={twMerge(
                                'block w-full h-full bg-transparent rounded-2xl border-transparent focus:border-transparent focus:ring-0 font-normal text-base text-landing-primary placeholder:text-gray-400 resize-none',
                                inputClassName,
                            )}
                            {...props}
                        />
                    )}
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

export default Field