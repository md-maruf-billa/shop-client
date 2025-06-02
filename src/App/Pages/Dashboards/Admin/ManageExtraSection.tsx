import { useDeleteExtraSectionMutation, useGetExtraSectionQuery, useUpdateExtraSectionMutation } from "@/App/Redux/features/admin/admin.api"
import { TSection } from "../../Views/Home/DaynamicSection"
import { Button } from "@/components/ui/button"
import { PencilOff, Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"


export default function ManageExtraSection() {
  const { data } = useGetExtraSectionQuery(undefined)
  const [deleteSection] = useDeleteExtraSectionMutation()

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteSection(id)
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Section has been deleted.",
            icon: "success"
          });
        } else {
          toast.error("Internal server error!!")
        }

      }
    });
  }
  return (
    <div>
      <h1 className="bg-gray-300 py-2 px-3 text-xl font-semibold text-brandTextPrimary">All Active Section</h1>
      <div className="grid grid-cols-6 mt-8 gap-3">
        {
          data?.data?.map((section: TSection) =>
            <div key={section?._id} className="border rounded-sm p-4">
              <div>
                <h1 className="text-lg">Name : {section?.name}</h1>
                <h1 className="text-gray-600">Title : {section?.title}</h1>
              </div>
              <div className="flex justify-end mt-3 gap-3">
                <UpdateExtraSectionModal section={section} />
                <Button onClick={() => handleDelete(section._id)} size={"icon"} variant={"destructive"}><Trash2 className="size-1" /></Button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}



function UpdateExtraSectionModal({ section }: { section: TSection }) {
  const [open, setOpen] = useState(false)
  const [updateSection] = useUpdateExtraSectionMutation()
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: section?.name,
      title: section?.title
    }
  })
  const handleUpdateSection: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Updating....")
    const res = await updateSection({
      id: section?._id,
      data: {
        title: data?.title,
        name: data?.name
      }
    })
    if (res?.data?.success) {
      toast.success("Section updated", { id })
      reset()
      setOpen(false)
    } else {
      toast.error("Internal server error!!", { id })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <PencilOff className="size-1" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleUpdateSection)}>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>
              Make changes to section here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Section Title</Label>
              <Input id="title" {...register("title")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Section Name</Label>
              <Input id="name" {...register("name")} />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Update Now</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}
