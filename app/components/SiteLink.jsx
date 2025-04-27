import { NavLink } from "@remix-run/react";

export default function SiteLink({ to, children, ...props }) {
    return (
        <NavLink to={to || '/'} {...props}>
            {children || `https://videowidget.pro${to || '/'}`}
        </NavLink>
    )
}
