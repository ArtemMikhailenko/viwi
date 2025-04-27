import { redirect, useLoaderData } from "@remix-run/react"
import { fetchCheckConfirmationKey } from "../../api"

export async function clientLoader({ params }) {
    const { code } = params
    let error = null

    if (code) {
        const { token, error: _error } = await fetchCheckConfirmationKey(code)
        if (_error) {
            error = _error.text
        } else {
            localStorage.setItem('token', token)
            return redirect('/app')
        }
    } else {
        error = 'Отсутствует код подтверждения'
    }

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error)}`)
    }
    return {}
}

export async function clientAction({ request }) {
    return {}
}

export default function ConfirmEmail() {
    const { error } = useLoaderData()

    return (
        <div>{error || ''}</div>
    )
}