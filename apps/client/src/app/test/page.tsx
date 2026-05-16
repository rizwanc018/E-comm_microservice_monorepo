import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
    const { getToken } = await auth();
    const token = await getToken();

    const prodRes = await fetch("http://localhost:8000/test", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const prodData = await prodRes.json();

    const ordRes = await fetch("http://localhost:8001/test", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const ordData = await ordRes.json();

    const payRes = await fetch("http://localhost:8002/test", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const payData = await payRes.json();

    console.log({ prodData, ordData, payData });

    return (
        <>
            <div>Test page</div>
        </>
    );
};

export default TestPage;
