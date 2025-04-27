import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { H1 } from "../../../components/landing/Heading";
import UserIcon from "./icons/UserIcon";

const QUESTIONS = [
    {question: 'Вопрос номер 1', answer: 'Клик на видеовиджет и просмотр видео. Клик на видеовиджет и просмотр видео. просмотр видео. просмотр видео. просмотр видео.'},
    {question: 'Вопрос номер 2', answer: 'Клик на видеовиджет и просмотр видео. Клик на видеовиджет и просмотр видео. просмотр видео. просмотр видео. просмотр видео.'},
    {question: 'Вопрос номер 3', answer: 'Клик на видеовиджет и просмотр видео. Клик на видеовиджет и просмотр видео. просмотр видео. просмотр видео. просмотр видео.'},
]

function Question({ question, answer }) {
    const [expanded, setExpanded] = useState(false);
    const toggle = () => {
        setExpanded(e => !e);
    }

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row gap-1 items-center justify-end">
                <div className="py-2 px-4 rounded-full font-semibold text-base leading-6 bg-[#FAFAFF]">
                    {question}
                </div>
                <UserIcon />
            </div>
            <div className="flex flex-row items-start justify-start gap-1 w-full">
                <div className={twMerge(
                    'w-full p-4 rounded-2xl bg-[#E6E6F4] transition-height duration-200 overflow-hidden',
                    expanded ? 'h-min' : 'h-[54px] text-nowrap text-ellipsis',
                )}>
                    {answer}
                </div>
                <div className="w-[22px] h-[22px] mt-3 cursor-pointer" onClick={toggle}>
                    <svg
                        className={twMerge(
                            'transition-transform duration-200',
                            expanded && 'transform-[rotate(180deg)]',
                        )}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="#9D9DBC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function FAQ() {
    return (
        <div className="grid grid-cols-12 gap-y-10 pt-[50px] pb-[70px] px-5">
            <H1 className="col-span-12 w-full text-center">Вопрос-ответ</H1>
            <div className="col-span-12 md:col-start-3 md:col-span-8 flex flex-col gap-6">
                {QUESTIONS.map(({ question, answer }) => (
                    <Question
                        key={question}
                        question={question}
                        answer={answer}
                    />
                ))}
            </div>
        </div>
    )
}