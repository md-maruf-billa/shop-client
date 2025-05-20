/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import generatePDF from 'react-to-pdf';
import {
    DollarSign,
    ShoppingCart,
    PackageCheck,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { useDashboardReportQuery } from '@/App/Redux/features/admin/admin.api';
import { DatePickerWithRange } from '@/App/Components/Customs/DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import * as htmlToImage from 'html-to-image';

const SalesReport = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const reportRef = useRef(null);
    const chartRef = useRef(null);
    const [chartImage, setChartImage] = useState<string | null>(null);

    const { data: reportData, isFetching } = useDashboardReportQuery({
        startDate: dateRange?.from?.toISOString().slice(0, 10),
        endDate: dateRange?.to?.toISOString().slice(0, 10),
    });

    const data = reportData?.data;

    useEffect(() => {
        if (chartRef.current) {
            htmlToImage
                .toPng(chartRef.current as HTMLElement)
                .then((dataUrl) => {
                    setChartImage(dataUrl);
                });
        }
    }, [data]);

    if (isFetching) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    const { summary, topProducts, topCustomers, paymentSummary } = data || {};

    const lineChartData = Object.entries(paymentSummary || {}).map(
        ([key, value]) => ({
            type: key,
            value,
        })
    );

    return (
        <div className="p-6 space-y-10 bg-white">
            {/* 🗓️ Date Picker and Download Button */}
            <div className="flex items-center justify-between">
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                <Button
                    onClick={() =>
                        generatePDF(reportRef, {
                            filename: 'sales-report.pdf',
                        })
                    }
                >
                    Download PDF
                </Button>
            </div>

            {/* 📄 PDF content starts here */}
            <div
                ref={reportRef}
                className="bg-white p-6 rounded-md shadow-sm space-y-8"
            >
                {/* 🟡 Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-tr from-blue-100 to-blue-50 shadow">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Total Orders</CardTitle>
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-blue-700">
                            {summary?.totalOrders ?? 0}
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-tr from-green-100 to-green-50 shadow">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Total Sales</CardTitle>
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-green-700">
                            {summary?.totalRevenue ?? 0}
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-tr from-purple-100 to-purple-50 shadow">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Items Sold</CardTitle>
                            <PackageCheck className="w-6 h-6 text-purple-600" />
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-purple-700">
                            {summary?.totalItemsSold ?? 0}
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Avg Order Value</CardTitle>
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-yellow-700">
                            {summary?.averageOrderValue.toFixed(2) ?? 0}
                        </CardContent>
                    </Card>
                </div>

                {/* 🟡 Top Products */}
                <div>
                    <h2 className="text-xl font-bold mb-2 mt-6">Top Products</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {topProducts?.map((product: any) => (
                            <Card key={product.productId}>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        {product.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between text-sm">
                                    <span>Sold: {product.unitsSold}</span>
                                    <span>Revenue: {product.totalRevenue}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 🟡 Top Customers */}
                <div>
                    <h2 className="text-xl font-bold mb-2 mt-6">Top Customers</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {topCustomers?.map((customer: any) => (
                            <Card key={customer._id}>
                                <CardHeader className="flex flex-col gap-1">
                                    <CardTitle className="text-base">
                                        {customer.name}
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground">
                                        {customer.email}
                                    </p>
                                </CardHeader>
                                <CardContent className="text-sm space-y-1">
                                    <p>Total Spent: {customer.totalSpent}</p>
                                    <p>Orders: {customer.totalOrders}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 🟡 Line Chart for Payment Summary */}
                <div>
                    <h2 className="text-xl font-bold mb-2 mt-6">Payment Summary</h2>
                    <Card>
                        <CardContent className="p-4">
                            <div ref={chartRef}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        data={lineChartData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="type" padding={{ left: 30, right: 30 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#6366f1"
                                            strokeWidth={3}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            {chartImage && (
                                <img
                                    src={chartImage}
                                    alt="Chart Snapshot"
                                    style={{ display: 'none' }}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
