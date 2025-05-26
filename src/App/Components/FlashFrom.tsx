import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateProductFlashStatusMutation } from "../Redux/features/product/product.api";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

export function FlashFrom() {
  const navigate = useNavigate()
  const [offer, setOffer] = useState<number | null>()
  const { state } = useLocation()
  const [updateFlashStatus] = useUpdateProductFlashStatusMutation()
  const handleProductFlashStatus = async () => {
    const toasId = toast.loading("Updating......")
    if (offer == 0 || offer == 1) {
      toast.error("Offer need more then 2 % !!")
      return
    }
    const payload = { productId: state, status: true, offer }
    const res = await updateFlashStatus(payload)
    console.log(res)
    if (res.data) {
      toast.success("Flash Deals status updated.", { id: toasId })
      navigate("/admin/manage-product")
    } else {
      toast.error("Something went wrong!!", { id: toasId })

    }
  }
  console.log(offer)
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="max-w-sm w-full border p-4 rounded-md space-y-4">
        <h1 className="text-xl font-bold text-center py-4 text-brandTextPrimary">Add Offer</h1>
        <p className="text-center italic text-sm">Note: Please enter a numeric value</p>
        <Input onChange={e => setOffer(Number(e.target.value))} type="number" />
        <Button onClick={handleProductFlashStatus} className="w-full">Add Now</Button>
      </div>
    </div>
  )
}
