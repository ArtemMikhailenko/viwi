// This is a copy of code from library @react-oauth/google
// but with wrapped error

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

const GoogleOAuthContext = createContext(null)

function useLoadGsiScript(options = {}) {
    const { nonce, onScriptLoadSuccess, onScriptLoadError } = options;
    const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = useState(false);
    const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
    onScriptLoadSuccessRef.current = onScriptLoadSuccess;
    const onScriptLoadErrorRef = useRef(onScriptLoadError);
    onScriptLoadErrorRef.current = onScriptLoadError;
    useEffect(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://accounts.google.com/gsi/client';
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.nonce = nonce;
        scriptTag.onload = () => {
            var _a;
            setScriptLoadedSuccessfully(true);
            (_a = onScriptLoadSuccessRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadSuccessRef);
        };
        scriptTag.onerror = () => {
            var _a;
            setScriptLoadedSuccessfully(false);
            (_a = onScriptLoadErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadErrorRef);
        };
        document.body.appendChild(scriptTag);
        return () => {
            try {
                document.body.removeChild(scriptTag);  // THERE IS THE WRAP
            } catch(e) {
                console.warn(e)
            }
        };
    }, [nonce]);
    return scriptLoadedSuccessfully;
}

export function GoogleOAuthProvider({ clientId, nonce, onScriptLoadSuccess, onScriptLoadError, children, }) {
    const scriptLoadedSuccessfully = useLoadGsiScript({
        nonce,
        onScriptLoadSuccess,
        onScriptLoadError,
    });
    const contextValue = useMemo(() => ({
        clientId,
        scriptLoadedSuccessfully,
    }), [clientId, scriptLoadedSuccessfully]);
    return (createElement(GoogleOAuthContext.Provider, { value: contextValue }, children));
}

function useGoogleOAuth() {
    const context = useContext(GoogleOAuthContext);
    if (!context) {
        throw new Error('Google OAuth components must be used within GoogleOAuthProvider');
    }
    return context;
}

export function useGoogleLogin({ flow = 'implicit', scope = '', onSuccess, onError, onNonOAuthError, overrideScope, state, ...props }) {
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const clientRef = useRef();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;
    const onNonOAuthErrorRef = useRef(onNonOAuthError);
    onNonOAuthErrorRef.current = onNonOAuthError;
    useEffect(() => {
        var _a, _b;
        if (!scriptLoadedSuccessfully)
            return;
        const clientMethod = flow === 'implicit' ? 'initTokenClient' : 'initCodeClient';
        const client = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.oauth2[clientMethod]({
            client_id: clientId,
            scope: overrideScope ? scope : `openid profile email ${scope}`,
            callback: (response) => {
                var _a, _b;
                if (response.error)
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef, response);
                (_b = onSuccessRef.current) === null || _b === void 0 ? void 0 : _b.call(onSuccessRef, response);
            },
            error_callback: (nonOAuthError) => {
                var _a;
                (_a = onNonOAuthErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onNonOAuthErrorRef, nonOAuthError);
            },
            state,
            ...props,
        });
        clientRef.current = client;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, scriptLoadedSuccessfully, flow, scope, state]);
    const loginImplicitFlow = useCallback((overrideConfig) => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestAccessToken(overrideConfig); }, []);
    const loginAuthCodeFlow = useCallback(() => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestCode(); }, []);
    return flow === 'implicit' ? loginImplicitFlow : loginAuthCodeFlow;
}
