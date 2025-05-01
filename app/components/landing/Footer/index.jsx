import { useEffect, useState } from "react";
import { NavLink, useFetcher } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import * as Yup from "yup";
import config from "../../../config";
import FieldSet from "../../Fields/FieldSet";
import Field from "../../Fields/Field";
import Confirmations from "../../Confirmations";
import CheckIcon from "./icons/CheckIcon";
import { H1 } from "../Heading";

function CopyIcon({ text }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => { setCopied(false) }, 1000)
        return () => { clearTimeout(timeout) }
    }, [copied])

    const copy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
        }).catch(() => {
            if (window.hasOwnProperty('clipboardData')) {
                try {
                    window.clipboardData.setData('Text', text)
                    setCopied(true)
                } catch (_) {
                    console.error('Copy error')
                }
            }
        })
    }

    return (
        <svg className="cursor-pointer" onClick={copy} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5001 1.5415C5.221 1.5415 4.08145 1.5415 3.22581 1.97748C2.47316 2.36097 1.86124 2.97289 1.47774 3.72554C1.04177 4.58119 1.04177 5.72074 1.04177 7.99984C1.04177 10.2789 1.04177 11.4185 1.47774 12.2741C1.86124 13.0268 2.47316 13.6387 3.22581 14.0222C4.08145 14.4582 5.221 14.4582 7.5001 14.4582C9.7792 14.4582 10.9188 14.4582 11.7744 14.0222C12.527 13.6387 13.139 13.0268 13.5225 12.2741C13.9584 11.4185 13.9584 10.2789 13.9584 7.99984C13.9584 5.72074 13.9584 4.58119 13.5225 3.72554C13.139 2.97289 12.527 2.36097 11.7744 1.97748C10.9188 1.5415 9.7792 1.5415 7.5001 1.5415Z" fill="#9D9DBC" />
            <path d="M15 6.5415V7.49984C15 10.3001 15 11.7002 14.455 12.7698C13.9757 13.7106 13.2108 14.4755 12.27 14.9549C11.2004 15.4998 9.80026 15.4998 7 15.4998H6.04177C6.04177 17.686 7.81398 19.4582 10.0001 19.4582H12.5584C14.7986 19.4582 15.9188 19.4582 16.7744 19.0222C17.527 18.6387 18.139 18.0268 18.5225 17.2741C18.9584 16.4185 18.9584 15.2984 18.9584 13.0582V10.4999C18.9584 8.31376 17.1862 6.5415 15 6.5415Z" fill="#9D9DBC" />
        </svg>
    )
}

function FormSubmittedOverlay() {
    return (
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-start gap-6 p-8 rounded-3xl bg-[#F2F2F9E5] backdrop-blur-[3px]">
            <CheckIcon />
            <div className="flex flex-col gap-4 w-full">
                <div className="font-unbounded font-medium text-xl leading-[115%] text-center">
                    Отправлено!
                </div>
                <div className="font-inter font-normal text-[#2D215A] text-center">
                    Вам ответят в течение 24 часов
                </div>
            </div>
        </div>
    )
}

const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный e-mail').required('Обязательное поле'),
    question: Yup.string().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов').required('Обязательное поле'),
});

function Form({ className }) {
    const fetcher = useFetcher();
    const [confirmation, setConfirmation] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('questionSubmitted')) {
            setFormSubmitted(true);
        }
    }, []);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
    } = useFormik({
        initialValues: {
            email: '',
            question: '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (!confirmation) return;
            fetcher.submit({ ...values, intent: 'landing-help' }, { method: 'POST', action: '/' });
        },
    });

    useEffect(() => {
        if (fetcher.data) {
            const { submitted } = fetcher.data;
            if (submitted) {
                localStorage.setItem('questionSubmitted', 'true');
                setFormSubmitted(true);
            }
        }
    }, [fetcher.data]);

    return (
        <div className={twMerge(
            'relative w-full max-w-[438px] rounded-3xl p-4 sm:p-6 md:p-8 bg-[#F2F2F9]',
            className,
        )}>
            <div className="flex flex-col gap-4 w-full">
                {/* Header */}
                <div className="flex flex-row items-center gap-1">
                    <div className="font-unbounded font-medium text-base sm:text-lg md:text-xl leading-[115%] break-all">
                        → help@videowidget.pro
                    </div>
                    <CopyIcon text="help@videowidget.pro" />
                </div>
                {/* Form */}
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <FieldSet>
                        <Field
                            label="Ваш e-mail"
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            error={touched.email && errors.email ? errors.email : null}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            tabIndex={1}
                        />
                        <Field
                            label="Вопрос"
                            type="text"
                            name="question"
                            id="question"
                            error={touched.question && errors.question ? errors.question : null}
                            value={values.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            tabIndex={2}
                            multiline
                            rows={3}
                        />
                        <Confirmations
                            checked={confirmation}
                            setChecked={setConfirmation}
                            name="confirmation"
                            tabIndex={3}
                        />
                        <button
                            type="submit"
                            disabled={!confirmation || fetcher.state === 'submitting'}
                            className={twMerge(
                                'primary-button-gradient-background',
                                'w-full mt-1 py-4 sm:py-5 md:py-[22px] rounded-[17px] font-inter font-normal text-center text-white !uppercase select-none cursor-pointer',
                            )}
                            tabIndex={4}
                        >
                            Отправить
                        </button>
                    </FieldSet>
                </form>
            </div>
            {formSubmitted && <FormSubmittedOverlay />}
        </div>
    )
}

function MenuItem({ title, link, className, ...props }) {
    return (
        <NavLink
            end
            to={link}
            className={twMerge(
                'font-semibold text-base text-[#E6E6F4] hover:text-[#9D9DBC]',
                className,
            )}
            {...props}
        >
            {title}
        </NavLink>
    )
}

function Menu({ title, children }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="font-normal text-sm tracking-[2%] text-[#9D9DBC] uppercase">
                {title}
            </div>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </div>
    )
}

export default function Footer() {
    return (
        <div className="w-full pt-[60px]">
            <div
                className="grid grid-cols-1 md:grid-cols-8 gap-y-[58px] items-center gap-[30px] md:gap-[60px] w-full h-min min-h-[100dvh] pt-[60px] md:pt-[80px] px-4 sm:px-5 pb-5"
                style={{
                    background: 'radial-gradient(100% 100% at 50% 0%, #4B357C 0%, #03010D 53.1%, #14054E 100%)',
                }}
            >
                <div id="contacts" className="col-span-1 md:col-span-8 flex flex-col gap-[40px] md:gap-[66px] items-center justify-center w-full">
                    <H1 className= "w-full max-w-[635px] text-[#F2F2F9] text-center text-[24px]  sm:text-[28px] md:text-[34px]    ">
                        Свяжитесь с нами, если остались вопросы
                    </H1>
                    <div className="w-full flex justify-center px-0 sm:px-4">
                        <Form />
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-4 flex flex-col gap-1.5 justify-end h-full">
                    <div className="grow" />
                    <div className={twMerge(
                        'text-gradient',
                        'font-unbounded font-semibold text-sm bg-[linear-gradient(90deg,#EEEEFA_0%,#D3D3FF_100%)] uppercase'
                    )}>
                        videowidget.pro
                    </div>
                    <div className={twMerge(
                        'text-gradient',
                        'font-inter font-normal text-sm bg-[linear-gradient(0deg,#FFFFFF,#FFFFFF),linear-gradient(0deg,#9D9DBC,#9D9DBC)]',
                    )}>
                        ©{new Date().getFullYear()} VideoWidget
                    </div>
                </div>
                
                <div className="col-span-1 md:col-span-4 flex flex-col justify-between gap-[30px] md:gap-[50px]">
                    <div className="flex flex-row flex-wrap gap-[40px] md:gap-[100px]">
                        <Menu title="Продукт">
                            <MenuItem title="О виджете" link="#mini-video-widgets" />
                            <MenuItem title="Интеграции" link="#integrations" />
                            <MenuItem title="Тарифы" link="#tariffs" />
                            <MenuItem title="Материалы" link="#" />
                        </Menu>
                        <Menu title="Материалы">
                            <MenuItem title="Инструкции" link="#" />
                            <MenuItem title="Журнал" link="#" />
                        </Menu>
                        <Menu title="Личный кабинет">
                            <MenuItem title="Регистрация" link="/registration" />
                            <MenuItem title="Вход" link="/login" />
                        </Menu>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-6 sm:gap-4">
                        <Menu title="чат Telegram">
                            <MenuItem
                                title="@videovidgethelp"
                                link="https://t.me/videowidgethelp"
                                className="font-unbounded"
                                target="_blank"
                            />
                        </Menu>
                        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-end gap-3">
                            <NavLink
                                to={config.links.termsAndConditions}
                                className={twMerge(
                                    'text-gradient',
                                    'w-max font-normal text-sm text-[#9D9DBC] hover:text-[#7a7a94]',
                                )}
                            >
                                Пользовательское соглашение
                            </NavLink>
                            <NavLink
                                to={config.links.privacyPolicy}
                                className={twMerge(
                                    'text-gradient',
                                    'w-max font-normal text-sm text-[#9D9DBC] hover:text-[#7a7a94]',
                                )}
                            >
                                Политика приватности
                            </NavLink>
                            <NavLink
                                to={config.links.publicOffer}
                                className={twMerge(
                                    'text-gradient',
                                    'w-max font-normal text-sm text-[#9D9DBC] hover:text-[#7a7a94]',
                                )}
                            >
                                Оферта
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}