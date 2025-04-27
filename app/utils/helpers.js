import config from '../config';

export const numberFormatter = new Intl.NumberFormat(config.locale);
export const relativeTimeFormat = new Intl.RelativeTimeFormat(config.locale, { style: 'long' });

export function base64Object(obj) {
    return btoa(JSON.stringify(obj))
}
