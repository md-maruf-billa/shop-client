

export default function OfferStiker({ offer }: { offer: string }) {
    return (
        <div className="absolute top-0 right-0">
            \<svg width="150" height="150" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="transparent" />
                <polygon points="90,80 240,100 190,240" fill="#fbbf24" />
                <polygon points="145,10 165,40 125,40" fill="#f97316" />
                <polygon points="40,220 60,240 30,250" fill="#f97316" />
                <polygon points="210,240 230,260 200,270" fill="#f97316" />

                <path d="M80,90 
           Q70,100 75,120 
           L105,210 
           Q110,220 130,220 
           L220,200 
           Q240,195 235,170 
           L205,90 
           Q200,80 180,80 
           L90,90 Z"
                    fill="#f97316" />

                <defs>
                    <radialGradient id="burst" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stop-color="white" stop-opacity="0.5" />
                        <stop offset="100%" stop-color="white" stop-opacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="150" cy="150" r="60" fill="url(#burst)" />

                <text x="150" y="140" font-size="30" font-weight="bold" fill="white" text-anchor="middle">{offer}</text>
                <text x="150" y="175" font-size="30" font-weight="bold" fill="white" text-anchor="middle">OFFER</text>

                <polygon points="190,200 220,215 200,240" fill="#fde68a" />

                <circle cx="110" cy="190" r="8" stroke="white" stroke-width="2" fill="none" />
            </svg>

        </div>
    )
}
