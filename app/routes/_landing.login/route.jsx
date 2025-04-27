import { Form, NavLink, redirect, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { motion } from 'framer-motion';
import { useFormik } from "formik";
import * as Yup from 'yup';

import LogoImage from "../../images/logo_1.png";
import FieldSet from "../../components/Fields/FieldSet";
import Field from "../../components/Fields/Field";
import PasswordField from "../../components/Fields/PasswordField";
import Switch from "../../components/Switch";
import { fetchLogin, fetchUser } from "../../api";
import OAuth from "../../components/auth/oauth";
import Error from "../../components/Error";

const excludeErrors = ['NO_AUTH_TOKEN', 'FORBIDDEN']

export const meta = () => [
    { title: "Вход в личный кабинет VideoWidget.pro" },
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

function ForgotPassword() {
    return (
        <NavLink end to="/reset-password" className="text-landing-light text-sm">
            Забыли пароль?
        </NavLink>
    )
}

export const clientLoader = async ({ request }) => {
    const url = new URL(request.url)
    let accessToken = url.searchParams.get('accessToken')
    let queryError = url.searchParams.get('error')
    let error = queryError ? { code: 'ERROR', text: queryError } : null

    if (accessToken) {
        localStorage.setItem('token', accessToken)
    } else {
        accessToken = localStorage.getItem('token')
    }
    if (accessToken) {
        const { error: _error } = await fetchUser()
        if (!_error) {
            return redirect('/app')
        }
        error = _error
    }

    return { error }
}

export const clientAction = async ({ request }) => {
    const formData = await request.formData()
    const form = Object.fromEntries(formData)

    const { error } = await fetchLogin({
        email: form.email,
        password: form.password,
        remember: Boolean(form.remember),
    })

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.text)}`)
    }
    return redirect('/app')
}

const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
    password: Yup.string().required('Введите пароль'),
    remember: Yup.boolean(),
});

export default function Login() {
    const { error } = useLoaderData();
    const navigate = useNavigate();
    const fetcher = useFetcher();

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
            remember: false,
        },
        validationSchema,
        onSubmit: (values) => {
            fetcher.submit(values, { method: 'POST' });
        },
    });

    const clearError = () => {
        navigate('/login')
    }

    return (
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
                                Вход
                            </div>
                            <div className="w-full">
                                <FieldSet>
                                    <Field
                                        label="E-mail"
                                        type="email"
                                        name="email"
                                        id="email"
                                        autocomplete="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.email && errors.email ? errors.email : null}
                                        tabIndex={1}
                                    />
                                    <PasswordField
                                        label="Пароль"
                                        extraLabel={<ForgotPassword />}
                                        name="password"
                                        id="password"
                                        autocomplete="current-password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && errors.password ? errors.password : null}
                                        required
                                        tabIndex={2}
                                    />
                                    <div className="text-landing-primary">
                                        <Switch
                                            name="remember"
                                            label="Запомнить меня"
                                            value={values.remember}
                                            checked={values.remember}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            tabIndex={3}
                                        />
                                    </div>
                                </FieldSet>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-1 py-6 primary-button-gradient-background rounded-[17px] font-inter font-normal text-center text-white uppercase select-none cursor-pointer"
                            >
                                Войти
                            </button>
                        </Form>
                        <OAuth />
                    </div>
                    <NavLink
                        end
                        to="/registration"
                        className="block text-center text-landing-primary bg-landing-wrapper rounded-[24px] py-3 uppercase font-semibold text-sm select-none"
                    >
                        зарегистрироваться
                    </NavLink>
                </motion.div>
                {error && !excludeErrors.includes(error.code) && (
                    <Error text={error.text} onClose={clearError} />
                )}
            </div>
        </div>
    )
}
