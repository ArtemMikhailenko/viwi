import { AxiosError } from 'axios'

const defaultErrorCode = 'OTHER_ERROR'
const defaultErrorMessage = 'Что-то пошло не так'

/**
 * @param {AxiosError} error 
 * @returns {string} error text
 */
export function extractErrorFromResponse(error) {
    const { response } = error
    if (response && response.data && response.data.error) {
        return { code: response.data.errorCode || defaultErrorCode, text: response.data.error }
    }
    return { code: defaultErrorCode, text: defaultErrorMessage }
}
