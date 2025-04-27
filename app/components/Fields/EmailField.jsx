import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useInteractiveField } from "./Helpers";
import EditIcon from "../icons/edit";
import CheckIcon from "../icons/check";

export default function EmailField({
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
    inputClassName,
    innerClassName,
    outerClassName,
    onBlur: propsOnBlur,
    ...props
}) {
    const inputRef = useRef(null);
    const [editing, setEditing] = useState(false);
    const { outerStyle, innerStyle, onMouseOver, onMouseLeave, onFocus, onBlur } = useInteractiveField();
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const handleBlur = (e) => {
        onBlur(e);
        if (propsOnBlur) propsOnBlur(e);
    }
    const onClickEdit = () => {
        setEditing(!editing);
    }

    return (
        <div className="select-none">
            <div className="flex flex-row justify-between items-end text-sm leading-6 text-indigo-900 font-normal">
                <label htmlFor={id} className="block">{label}</label>
                {extraLabel}
            </div>
            <div
                onMouseEnter={onMouseOver}
                onMouseLeave={onMouseLeave}
                className={twMerge(
                    'border-[3px] rounded-[14px]',
                    editing ? 'my-0' : 'my-[2px] !border-1 !border-[#d6d6ed] !hover:border-transparent !focus:border-transparent !focus:ring-0',
                    outerStyle,
                    outerClassName,
                )}
            >
                <div className={twMerge(
                    'flex flex-row items-center rounded-[12px] text-landing-primary placeholder:text-gray-400',
                    editing ? '' : '!bg-[#F2F2F9] !border-[3px] !border-transparent !hover:border-transparent !focus:border-transparent !focus:ring-0',
                    innerStyle,
                    innerClassName,
                )}>
                    <input
                        type={type}
                        name={name}
                        id={id}
                        ref={inputRef}
                        autoComplete={autocomplete}
                        onChange={onChange}
                        value={value}
                        required={required}
                        disabled={disabled || !editing}
                        onFocus={onFocus}
                        onBlur={handleBlur}
                        className={twMerge(
                            'block w-full h-full bg-transparent rounded-2xl border-transparent focus:border-transparent focus:ring-0 font-normal text-base text-landing-primary placeholder:text-gray-400 resize-none',
                            editing ? '' : 'opacity-50',
                            inputClassName,
                        )}
                        {...props}
                    />
                    <div>
                        <div
                            className="flex items-center justify-center !w-[34px] !h-[34px] m-[7px] rounded-[8px] bg-[#E6E6F4] hover:bg-[#dedeed] cursor-pointer"
                            onClick={onClickEdit}
                        >
                            {editing ? <CheckIcon /> : <EditIcon />}
                        </div>
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
