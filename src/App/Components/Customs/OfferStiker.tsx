

export default function OfferStiker({ offer }: { offer: number }) {
    return (
        <div className="absolute text-sm top-4 left-0 w-36 py-1 bg-brandSelect text-white text-center rounded-r-full">
            {offer}% OFF
        </div>
    )
}
