import Link from "next/link";

const ReturnPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string }> | undefined;
}) => {
    const session_id = (await searchParams)?.session_id;

    if (!session_id) {
        return (
            <div className="py-10 mt-12 flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-red-500 text-lg font-medium">No session ID found.</p>
                </div>
            </div>
        );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`);
    const data = await res.json();

    return (
        <div className="py-10 mt-12 flex items-center justify-center bg-gray-50">
            <div className="text-center p-10 bg-white rounded-xl shadow-md max-w-md w-full">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment {data.status}</h1>
                <p className="text-gray-500 mb-6">Payment status: {data.paymentStatus}</p>
                <Link
                    href="/orders"
                    className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    See your orders
                </Link>
            </div>
        </div>
    );
};

export default ReturnPage;
