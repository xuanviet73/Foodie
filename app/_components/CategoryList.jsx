import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const styles = `
  .overflow-hidden::-webkit-scrollbar {
    display: none;
  }
`;

function CategoryList() {
  const lisRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const categoryParam = params.get("category");
    setSelectedCategory(categoryParam || "all");
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };

  const ScrollRightHandler = () => {
    if (lisRef.current) {
      lisRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const ScrollLeftHandler = () => {
    if (lisRef.current) {
      lisRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-10 relative">
      <style>{styles}</style> {/* Inject CSS styles */}
      <ArrowLeftCircle
        className="absolute left-0 top-9 bg-pink-500 rounded-full text-white h-8 w-8 cursor-pointer"
        onClick={ScrollLeftHandler}
      />
      <div className="flex gap-4 overflow-x-auto overflow-hidden" ref={lisRef}>
        {categoryList.map((category, index) => (
          <Link
            href={`?category=${category.slug}`}
            key={index}
            className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 cursor-pointer ${
              selectedCategory === category.slug
                ? "text-primary border-primary bg-orange-50"
                : "hover:border-primary hover:bg-orange-50"
            }`}
          >
            <div className="group">
              <Image
                src={category.icon?.url}
                alt={category.name}
                width={40}
                height={40}
                className="group-hover:scale-125 transition-all duration-200"
              />
            </div>
            <h2 className="text-sm font-medium text-center">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
      <ArrowRightCircle
        className="absolute right-0 top-9 bg-pink-500 rounded-full text-white h-8 w-8 cursor-pointer"
        onClick={ScrollRightHandler}
      />
    </div>
  );
}

export default CategoryList;
