/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteShippingFeeMutation, useGetWebInfoQuery, useUpdateShippingFeeMutation } from '@/App/Redux/features/admin/admin.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Swal from 'sweetalert2';


const UpdateShippingFee = () => {
    const [updateShippingFee] = useUpdateShippingFeeMutation()
    const [deleteShipping] = useDeleteShippingFeeMutation()
    const { data, refetch } = useGetWebInfoQuery(undefined)
    const shipping = data?.data?.webInfo?.shipping
    const handleUpdateShippingFee = async (e: any) => {
        e.preventDefault()
        const dt = e.target;
        const data = {
            title: dt.title.value,
            minDay: dt.min.value,
            maxDay: dt.max.value,
            fee: dt.fee.value
        }
        console.log(data)
        const res = await updateShippingFee(data)
        if (res?.data?.success) {
            toast.success("Updated successful")
            await refetch()
        }
        else {
            toast.success("Updated Un-successful",)
        }
    }

    const handleDeleteShipping = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteShipping(id);
                if (res.data?.success) {
                    await refetch()
                    Swal.fire({
                        title: "Canceled !",
                        text: "Pick up reject successfully.",
                        icon: "success",
                        timer: 1500
                    });
                }

            }
        });
    }
    return (
        <div className="mt-10 max-w-2xl border p-8 rounded-md">
            <div className="mt-4 full">
                <h2 className="text-2xl text-center font-semibold">Update Shipping Info</h2>
                <form className="mt-8" onSubmit={e => handleUpdateShippingFee(e)}>
                    <div className="flex items-center w-full gap-4">
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="title">Shipping Title</Label>
                            <Input
                                name="title"
                                type="text"
                                id="title"
                                placeholder="Ex: Basic Shipping"
                            />
                        </div>
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="fee">Shipping Fee</Label>
                            <Input
                                type="text"
                                id="fee"
                                name="fee"
                                placeholder="Ex: 10"
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-4 mt-8">
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="min">Minimum Shipping</Label>
                            <Input
                                name="min"
                                type="text"
                                id="min"
                                placeholder="Ex: Basic Shipping"
                            />
                        </div>
                        <div className="grid w-full  items-center gap-1.5">
                            <Label htmlFor="max">Maximum Shipping</Label>
                            <Input
                                type="text"
                                id="max"
                                name="max"
                                placeholder="Ex: 10"
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-4 mt-8">
                        <Button type="submit">Update Now</Button>
                    </div>
                </form>
            </div>
            <br />
            <hr />
            <br />
            <h2 className='text-center font-semibold'>Existing Shipping Info</h2>

            <div className='mt-4'>
                {
                    shipping?.map((shp: any, idx: number) =>

                        <div key={idx} className="flex items-center justify-between border rounded-lg p-4 mb-2">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="font-medium">{shp?.title}</p>
                                    <p className="text-sm text-gray-500">{shp?.minDay} - {shp?.maxDay}</p>
                                </div>
                            </div>
                            <div className='text-center'>
                                <p className="font-medium">Fee</p>
                                <p className="font-medium">{shp?.fee}</p>
                            </div>
                            <Button onClick={() => handleDeleteShipping(shp._id)} variant={"destructive"}>Delete</Button>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default UpdateShippingFee;