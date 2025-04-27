import { useState } from "react"

import config from "../../config"

const fieldInputState = {
    default: 'default',
    hover: 'hover',
    focus: 'focus',
}
const fieldOuterStyle = {
    default: 'border-input-outer-default',
    hover: 'border-input-outer-hover',
    focus: 'border-input-outer-focus',
}
const fieldInnerStyle = {
    default: 'border border-input-inner-default bg-input-default',
    hover: 'border border-input-inner-hover bg-input-hover',
    focus: 'border border-input-inner-focus bg-input-focus',
}

export function useInteractiveField() {
    const [state, setState] = useState(fieldInputState.default);

    const onMouseOver = () => {
        if (state == fieldInputState.default) {
            setState(fieldInputState.hover);
        }
    }
    const onMouseLeave = () => {
        if (state == fieldInputState.hover) {
            setState(fieldInputState.default);
        }
    }
    const onFocus = () => {
        setState(fieldInputState.focus);
    }
    const onBlur = () => {
        setState(fieldInputState.default);
    }

    return {
        outerStyle: fieldOuterStyle[state],
        innerStyle: fieldInnerStyle[state],
        onMouseOver,
        onMouseLeave,
        onFocus,
        onBlur,
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
