import { useEffect, useState } from "react"
import { Navigate } from "@remix-run/react"

import config from "../../config"
import GoogleIcon from '../../components/icons/google'
import YandexIcon from '../../components/icons/yandex'
import VKIcon from '../../components/icons/vk'
import { base64Object } from '../../utils/helpers'
import { GoogleOAuthProvider, useGoogleLogin } from "./google"

function buildYandexAuthLink(stateString) {
    const redirectUri = config.environment[process.env.NODE_ENV || 'development'].YANDEX_REDIRECT_URL
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.yandex.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${stateString}`
}

function buildVKAuthLink(stateString) {
    const redirectUri = config.environment[process.env.NODE_ENV || 'development'].VK_REDIRECT_URL
    return `${redirectUri}/init?state=${stateString}`
}

const queryState = encodeURIComponent(base64Object({ redirect: '/login?accessToken={token}', mode: 'LOGIN', source: '/login' }))
const yandexAuthLink = buildYandexAuthLink(queryState)
const vkAuthLink = buildVKAuthLink(queryState)

function OAuthContent() {
    const [googleAuth, setGoogleAuth] = useState({ token: null, error: null })

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            setGoogleAuth({ token: tokenResponse.access_token, error: null })
        },
        onError: ({ error }) => {
            setGoogleAuth({ token: null, error })
        },
    })

    useEffect(() => {
        if (googleAuth.token != null) {
            document.location.replace(`/api/auth/google?token=${googleAuth.token}&state=${queryState}`)
        }
        if (googleAuth.error != null) {
            return <Navigate replace to={`/api/auth/google?error=${encodeURIComponent(googleAuth.error)}`} />
        }
    }, [googleAuth])

    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="text-sm text-landing-secondary select-none">
                Или войти с помощью
            </div>
            <div className="flex gap-2">
                <div
                    // href={googleAuthLink}
                    onClick={googleLogin}
                    className='block py-3 px-4 bg-landing-button-default hover:bg-landing-button-hover rounded-2xl cursor-pointer'
                >
                    <GoogleIcon />
                </div>
                <a
                    href={yandexAuthLink}
                    className='block py-3 px-4 bg-landing-button-default hover:bg-landing-button-hover rounded-2xl cursor-pointer'
                >
                    <YandexIcon />
                </a>
                <a
                    href={vkAuthLink}
                    className='block py-3 px-4 bg-landing-button-default hover:bg-landing-button-hover rounded-2xl cursor-pointer'
                >
                    <VKIcon />
                </a>
            </div>
        </div>
    )
}

export default function OAuth() {
    return (
        <GoogleOAuthProvider clientId={config.google.clientId}>
            <OAuthContent />
        </GoogleOAuthProvider>
    )
}
