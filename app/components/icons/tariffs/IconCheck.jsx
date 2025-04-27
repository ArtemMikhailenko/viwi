export default ({ active = false }) => (
    active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66797 8.66667L6.0013 12L13.3346 4" stroke="#2D215A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.66797 8.66667L6.0013 12L13.3346 4" stroke="url(#paint0_radial_796_5327)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <radialGradient id="paint0_radial_796_5327" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.7409 2.92831) rotate(132.207) scale(12.78 14.3959)">
                    <stop stopColor="#B5B5FF" />
                    <stop offset="0.5" stopColor="#5353EB" />
                    <stop offset="1" stopColor="#8A8AFF" />
                </radialGradient>
            </defs>
        </svg>

    ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66797 8.66667L6.0013 12L13.3346 4" stroke="#2D215A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
)