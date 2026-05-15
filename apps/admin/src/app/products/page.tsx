import { Product, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<Product[]> => {
    return [
        {
            id: 1,
            name: "Adidas CoreFit T-Shirt",
            shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            description:
                "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            price: 39.9,
            sizes: ["s", "m", "l", "xl", "xxl"],
            colors: ["red", "green"],
            images: {
                red: "/products/1r.png",
                green: "/products/1gr.png",
            },
        },
        {
            id: 2,
            name: "Puma Ultra Warm Zip",
            shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            description:
                "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            price: 59.9,
            sizes: ["s", "m", "l", "xl"],
            colors: ["white", "black"],
            images: { white: "/products/2w.png", black: "/products/2b.png" },
        },
        {
            id: 3,
            name: "Nike Air Essentials Pullover",
            shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            description:
                "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            price: 69.9,
            sizes: ["s", "m", "l"],
            colors: ["green", "white"],
            images: {
                green: "/products/3g.png",
                white: "/products/3w.png",
            },
        },
        {
            id: 4,
            name: "Nike Dri Flex T-Shirt",
            shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            description:
                "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            price: 29.9,
            sizes: ["s", "m", "l"],
            colors: ["gray", "blue"],
            images: { gray: "/products/4g.png", blue: "/products/4b.png" },
        },
        {
            id: 5,
            name: "Under Armour StormFleece",
            shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            description:
                "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
            price: 49.9,
            sizes: ["s", "m", "l"],
            colors: ["red", "orange", "black"],
            images: {
                red: "/products/5r.png",
                orange: "/products/5o.png",
                black: "/products/5bl.png",
            },
        },
    ];
};

const PaymentsPage = async () => {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold">All Products</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default PaymentsPage;
