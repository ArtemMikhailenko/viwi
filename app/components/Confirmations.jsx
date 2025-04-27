import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import config from "../config";

const expandVariants = {
    opened: { transform: 'rotate(180deg)' },
    closed: { transform: 'rotate(0deg)' },
};

function Chip({ children, link }) {
    return (
        <a href={link} className="block w-min py-[2px] px-[6px] rounded-md bg-landing-field hover:bg-landing-active shadow-chip text-nowrap cursor-pointer">
            {children}
        </a>
    )
}

export default function Confirmations({ checked, setChecked, ...props }) {
    const [agreementsExpanded, setAgreementsExpanded] = useState(false)

    const onChange = (e) => {
        setChecked(e.target.checked)
    }
    const toggleAgreements = () => {
        setAgreementsExpanded(!agreementsExpanded)
    }

    return (
        <div className="flex flex-col gap-[2px] w-full text-xs font-normal text-helper select-none">
            <div className="flex flex-row space-between gap-[2px] w-full">
                <div className="flex flex-row gap-[3px] grow p-1 rounded-md bg-landing-field select-none cursor-pointer">
                    <input
                        type="checkbox"
                        id="confirmations"
                        // name="confirmations"
                        value={checked}
                        className="hidden peer"
                        onChange={onChange}
                        {...props}
                    />
                    <label htmlFor="confirmations" className="flex flex-row gap-1 items-center cursor-pointer">
                        <div className={twMerge(
                            'flex items-center justify-center w-5 h-5 p-[2px] rounded',
                            checked ? 'bg-[#DADAEF]' : 'bg-[#F2F2F9] border border-[#BCBCE6]'
                        )}>
                            <svg width="12" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33325 5.58333L4.24992 8.5L10.6666 1.5" stroke={checked ? 'white' : 'transparent'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.33325 5.58333L4.24992 8.5L10.6666 1.5" stroke={checked ? '#2D215A' : 'transparent'} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>Принимаю условия использования сервиса</div>
                    </label>
                </div>
                <div
                    onClick={toggleAgreements}
                    className="py-[6px] px-[26px] rounded-md bg-landing-field hover:bg-landing-active cursor-pointer"
                >
                    <motion.div
                        animate={agreementsExpanded ? 'opened' : 'closed'}
                        variants={expandVariants}
                        className="flex items-center justify-center w-4 h-4">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 6L8.5 10L12.5 6" stroke="#2D215A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </div>
            <AnimatePresence>
                {agreementsExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 20 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-row flex-wrap justify-end gap-[2px] w-full"
                    >
                        <Chip link={config.links.termsAndConditions}>Соглашение</Chip>
                        <Chip link={config.links.privacyPolicy}>Политика приватности</Chip>
                        <Chip link={config.links.publicOffer}>Оферта</Chip>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}