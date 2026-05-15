import { ProductsType } from "@/types";
import Link from "next/link";
import Categories from "./Categories";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

// TEMPORARY
const products: ProductsType = [
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

const ProductList = ({ category, params }: { category: string; params: "homepage" | "products" }) => {
    return (
        <div className="w-full">
            <Categories />
            {params === "products" && <Filter />}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Link
                href={category ? `/products/?category=${category}` : "/products"}
                className="flex justify-end mt-4 underline text-sm text-gray-500"
            >
                View all products
            </Link>
        </div>
    );
};

export default ProductList;
