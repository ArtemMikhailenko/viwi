import { useState } from "react";
import { Form, NavLink, redirect, useActionData, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

import { fetchRegister, fetchUser } from "../../api";
import LogoImage from "../../images/logo_1.png";
import OAuth from "../../components/auth/oauth";
import Field from "../../components/Fields/Field";
import FieldSet from "../../components/Fields/FieldSet";
import PasswordField from "../../components/Fields/PasswordField";
import Confirmations from "../../components/Confirmations";
import Error from "../../components/Error";

const excludeErrors = ['NO_AUTH_TOKEN']

export const meta = () => [
    { title: "Регистрация в сервисе VideoWidget.pro" },
]

function Header() {
    return (
        <header className="w-full h-[82px] flex flex-row py-4 px-6 justify-between border-b border-solid border-transparent select-none">
            <NavLink
                end
                to="/"
                className="flex flex-row justify-start w-min px-2 py-3 gap-2.5">
                <img src={LogoImage} alt="Logo" className="h-full" />
                <div className="flex items-center uppercase font-unbounded font-medium text-sm tracking-wide logo-text-gradient-background">videowidget.pro</div>
            </NavLink>
        </header>
    )
}

export async function clientLoader({ request }) {
    const url = new URL(request.url)
    const accessToken = localStorage.getItem('token')
    let error = url.searchParams.get('error')

    if (accessToken) {
        const { error: _error } = await fetchUser()
        if (!_error) {
            return redirect('/app')
        }
        error = _error
    }

    return { error }
}

export async function clientAction({ request }) {
    const formData = await request.formData()
    const form = Object.fromEntries(formData)

    if (!form.email || !form.password) {
        return { error: 'Не заполнены обязательные поля' }
    }
    // TODO: add validation of password

    if (!form.confirmations) {
        return { error: 'Необходимо принять условия' }
    }

    const { user, error } = await fetchRegister({
        email: form.email,
        password: form.password,
    })

    if (error) {
        return redirect(`/registration?error=${encodeURIComponent(error.text)}`)
    }
    return redirect('/app')
}

const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный e-mail').required('Обязательное поле'),
    password: Yup.string().min(8, 'Пароль должен содержать минимум 8 символов').required('Введите пароль'),
});

export default function Registration() {
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const [confirmations, setConfirmations] = useState(true);

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
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            fetcher.submit({ ...values, confirmations: confirmations ? 'on' : '' }, { method: 'POST' });
        },
    });

    const { error } = fetcher?.data || actionData || loaderData || {};

    const onCloseError = () => {
        navigate('/registration')
    }

    return (
        <>
            <div className="flex flex-col h-[100dvh] min-h-screen font-inter text-landing-primary bg-reg-back">
                <Header />
                <div className="flex flex-col justify-center items-center h-full grow">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className='flex flex-col gap-[2px] w-[438px]'
                    >
                        <div className="flex flex-col gap-4 w-full bg-landing-wrapper rounded-[24px] p-8">
                            <Form
                                className="flex flex-col gap-4 w-full"
                                method="POST"
                                onSubmit={handleSubmit}
                            >
                                <div className="w-full h-auto text-center font-unbounded font-medium text-[26px] leading-[30px] text-landing-primary select-none">
                                    Регистрация
                                </div>
                                <div className="w-full">
                                    <FieldSet>
                                        <Field
                                            label="E-mail"
                                            type="email"
                                            name="email"
                                            id="email"
                                            autocomplete="email"
                                            helperText="Сюда придёт ссылка активации аккаунта"
                                            error={touched.email && errors.email ? errors.email : null}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            tabIndex={1}
                                        />
                                        <PasswordField
                                            label="Пароль"
                                            name="password"
                                            id="password"
                                            autocomplete="current-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.password && errors.password ? errors.password : null}
                                            tabIndex={2}
                                        />
                                        <input type="hidden" name="confirmations" value={confirmations ? 'on' : ''} hidden readOnly />
                                        <Confirmations checked={confirmations} setChecked={setConfirmations} />
                                    </FieldSet>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-1 py-6 primary-button-gradient-background rounded-[17px] font-inter font-normal text-center text-white uppercase select-none cursor-pointer disabled:cursor-default"
                                    disabled={!confirmations}
                                >
                                    Зарегистрироваться
                                </button>
                            </Form>
                            <OAuth />
                        </div>
                        <NavLink
                            end
                            to="/login"
                            className="block text-center text-landing-primary bg-landing-wrapper rounded-[24px] py-3 uppercase font-semibold text-sm select-none"
                        >
                            войти в аккаунт
                        </NavLink>
                    </motion.div>
                </div>
                {error && typeof error === 'string' ? (
                    <Error text={error} onClose={onCloseError} />
                ) : (
                    error?.code && excludeErrors.includes([error.code]) && (
                        <Error text={error.text} onClose={onCloseError} />
                    )
                )}
            </div>
        </>
    )
}
