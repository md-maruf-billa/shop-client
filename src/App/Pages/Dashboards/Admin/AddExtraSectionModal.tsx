import { useAddExtraSectionMutation } from "@/App/Redux/features/admin/admin.api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddExtraSectionModal() {
    const [openModal, setOpenModal] = useState(false)
    const [createExtraSection] = useAddExtraSectionMutation()
    const { register, handleSubmit, reset } = useForm()
    const handleSectionAdd: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("Section Creating....")
        const res = await createExtraSection(data)
        console.log(data)
        console.log(res)
        if (res?.data?.success) {
            toast.success("Section Created", { id })
            setOpenModal(false)
            reset()
        } else {
            toast.error("Internal sever error!!", { id })
        }
    }
    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <form>
                <DialogTrigger asChild>
                    <Button className="bg-brandTextPrimary">Add Extra Section</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-center">Add Extra Section</DialogTitle>
                        <DialogDescription className="text-center">
                            This section visible on home page in dynamically
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleSectionAdd)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Section Title</Label>
                                <Input {...register("title")} required id="name-1" placeholder="Explore new" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Section Name</Label>
                                <Input {...register("name")} required id="username-1" placeholder="Ex: - Category2" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-5">
                            <Button type="submit">Add Now</Button>
                        </div>
                    </form>
                </DialogContent>
            </form>
        </Dialog>
    )
}
