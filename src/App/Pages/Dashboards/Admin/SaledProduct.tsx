
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TProduct } from "@/Types";
import { Link } from "react-router";

const SaledProduct = ({ saleProducts }: { saleProducts: TProduct[] }) => {
    return (
        <div>
            <h1 className="text-xl font-bold mt-8 ml-4 text-brandTextPrimary">Most Sale Product-</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product Id</TableHead>
                        <TableHead>Product name</TableHead>
                        <TableHead>Product Category</TableHead>
                        <TableHead>Product Stock</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {saleProducts?.map((pd) => (
                        <TableRow key={pd?._id}>
                            <TableCell className="font-medium"><Link to={`/product-details/${pd?._id}`}>{pd?._id}</Link></TableCell>
                            <TableCell>{pd?.name}</TableCell>
                            <TableCell>{pd?.category?.name}</TableCell>
                            <TableCell>{pd?.stock}</TableCell>
                            <TableCell className="text-right">{pd?.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SaledProduct;