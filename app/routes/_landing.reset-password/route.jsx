import { Form, NavLink, redirect, useActionData, useFetcher, useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

import LogoImage from "../../images/logo_1.png";
import FieldSet from "../../components/Fields/FieldSet";
import Error from "../../components/Error";
import { resetPassword } from "../../api";
import Field from "../../components/Fields/Field";

const excludeErrors = ['NO_AUTH_TOKEN']

export const meta = () => [
    { title: "Сброс пароля VideoWidget.pro" },
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
    return {}
}

export async function clientAction({ request }) {
    const formData = await request.formData()
    const form = Object.fromEntries(formData)

    const { email } = form
    if (!email) {
        return { error: 'Необходимо указать E-Mail' }
    }

    const { error } = await resetPassword({ email })
    if (error) {
        return { error: error.text }
    }

    return redirect('/app')
}

const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный e-mail').required('Введите e-mail'),
});

export default function ResetPassword() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const fetcher = useFetcher();

    const { error } = fetcher?.data || actionData || {};

    const onCloseError = () => {
        fetcher.data = undefined;
        navigate('/reset-password');
    };

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
        },
        validationSchema,
        onSubmit: (values) => {
            fetcher.submit(values, { method: 'POST' });
        },
    });

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
                                Сброс пароля
                            </div>
                            <div className="w-full">
                                <FieldSet>
                                    <div className="w-full text-center">
                                        Оставьте ваш email и мы отправим ссылку для восстановления доступа
                                    </div>
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
                                </FieldSet>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-1 py-6 primary-button-gradient-background rounded-[17px] font-inter font-normal text-center text-white uppercase select-none cursor-pointer"
                            >
                                Сбросить пароль
                            </button>
                        </Form>
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
    )
}
