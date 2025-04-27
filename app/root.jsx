import { useEffect } from "react";
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError } from "@remix-run/react"
import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from 'remix-themes'

import { themeSessionResolver } from './sessions.server'
import stylesheet from "./styles/index.css?url";
import NotFoundImage from './images/404-illustration.svg'
import NotFoundImageDark from './images/404-illustration-dark.svg'
import { ColorSchemeScript, createTheme as createMantineTheme, MantineProvider, mantineHtmlProps } from "@mantine/core";
import mantineCss from '@mantine/core/styles.css';
import { fetchLandingHelp } from "./api";

export const meta = () => [
    { title: "Видеовиджет для сайта - VideoWidget.pro" },
    {
        name: "description",
        content: (
            'Виджет на сайт с Вашим видео - уникальный способ обратиться к пользователю и улучшить конверсию. '
            + 'Расскажите о своем продукте, собирайте заявки и многое другое'
        )
    },
]

export const links = () => [
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: mantineCss },
];

export const loader = async ({ request }) => {
    return {
        theme: 'light',
    }
    // const { getTheme } = await themeSessionResolver(request)
    // return {
    //     theme: getTheme(),
    // }
}

export const clientAction = async ({ request }) => {  // Copy of clientAction from app/routes/_landing._index/route.jsx
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    let submitted = false;

    switch (body.intent) {
        case 'landing-help':
            const { success } = await fetchLandingHelp({ email: body.email, question: body.question });
            submitted = !!success;
            break;
        default:
            break;
    }
    return { submitted };
}

const mantineTheme = createMantineTheme({

});

export function ErrorBoundary() {
    const error = useRouteError()
    // const [theme] = useTheme();
    const theme = 'light';

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.add('[&_*]:!transition-none');
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }

        const transitionTimeout = setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none');
        }, 1);

        return () => clearTimeout(transitionTimeout);
    }, [theme]);

    console.debug(error)

    return (
        <html lang="ru" data-theme={theme ?? ''}>
            <head>
                <title>Страница не найдена</title>
                <Meta />
                <Links />
            </head>
            <body className="w-screen min-h-screen font-inter antialiased bg-whisper-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <div id="root" className="flex w-full">
                    <div className="flex w-full h-[100dvh] overflow-hidden">
                        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
                            <main className="grow bg-[#F2F2F9]">
                                <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                                    <div className="max-w-2xl m-auto mt-16">
                                        <div className="text-center px-4">
                                            {error?.status === 404 ? (
                                                <>
                                                    <div className="inline-flex mb-8">
                                                        <img className="dark:hidden" src={NotFoundImage} width="176" height="176" alt="404 illustration" />
                                                        <img className="hidden dark:block" src={NotFoundImageDark} width="176" height="176" alt="404 illustration dark" />
                                                    </div>
                                                    <div className="mb-6">Хмм... Кажется такой страницы не существует</div>
                                                    <Link to="/" className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                                                        На главную
                                                    </Link>
                                                </>
                                            ) : (
                                                <div className="text-cyan-900">Упс... Что-то пошло не так</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </div>
            </body>
        </html>
    )
}

function Root() {
    // const data = useLoaderData();
    // const [theme] = useTheme();
    const theme = 'light';
    const data = { theme };

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.add('[&_*]:!transition-none');
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }

        const transitionTimeout = setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none');
        }, 1);

        return () => clearTimeout(transitionTimeout);
    }, [theme]);

    return (
        <html lang="ru" data-theme={theme ?? ''} {...mantineHtmlProps} className="scroll-smooth">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
                <ColorSchemeScript />
            </head>
            <body className="w-screen min-h-screen font-inter antialiased bg-whisper-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <div id="root" className="flex w-full">
                    <MantineProvider theme={mantineTheme}>
                        <Outlet />
                    </MantineProvider>
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </div>
            </body>
        </html>
    )
}

export default function RootWithProviders() {
    const data = useLoaderData()
    return (
        <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
            <Root />
        </ThemeProvider>
    )
}
