import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__remix-themes',
        // domain: 'remix.run',
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secrets: ['d6012b76-ee25-4afe-9dfc-0827da0ea56b'],
        // secure: true,
    },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
