import { useId } from "react"
import { motion } from "framer-motion"

const transition = { duration: 0.2 }

const dotVariants = {
    checked: {
        marginLeft: '12px',
    },
    unchecked: {
        marginLeft: '0px',
    },
}

const outerStyle = {
    true: 'bg-switch-outer-on-default group-hover:bg-switch-outer-on-hover',
    false: 'bg-switch-outer-off-default group-hover:bg-switch-outer-off-hover',
}
const innerStyle = {
    true: 'bg-switch-inner-on-default group-hover:bg-switch-inner-on-hover',
    false: 'bg-switch-inner-off-default group-hover:bg-switch-inner-off-hover',
}

function Switch({ name, label, checked, setChecked, ...props }) {
    const id = useId()

    const onChange = (e) => setChecked(e.target.checked)

    return (
        <div className="mt-1">
            <input type="checkbox" id={id} name={name} className="sr-only" onChange={onChange} {...props} />
            <label
                htmlFor={id}
                className="group flex flex-row gap-2 items-center text-sm font-normal select-none cursor-pointer"
            >
                <div className={`w-[32px] h-[20px] p-[3px] rounded-full cursor-pointer ${outerStyle[checked]}`}>
                    <motion.div
                        animate={checked ? 'checked' : 'unchecked'}
                        variants={dotVariants}
                        transition={transition}
                        className={`w-[14px] h-[14px] opacity-80 rounded-full ${innerStyle[checked]}`}
                    />
                </div>
                {label}
            </label>
        </div >
    )
}

export default Switch