import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function MenuSection({ restaurant }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  useEffect(() => {
    restaurant?.menu && FilterMenu(restaurant?.menu[0]?.categories);
  }, [restaurant]);

  const FilterMenu = (categories) => {
    const result = restaurant?.menu?.filter(
      (item) => item.categories == categories
    );
    setMenuItemList(result[0]);
  };

  const addToCartHandler = (item) => {
    toast("Đang thêm vào giỏ hàng", {
      style: {
        backgroundColor: "white",
        color: "black",
        border: "1px solid white"
      }
    });
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: item?.name,
      description: item?.description,
      productImage: item?.productImage?.url,
      price: item?.price,
      restaurantSlug: restaurant.slug
    };
    GlobalApi.AddToCart(data).then(
      (resp) => {
        console.log(resp);
        setUpdateCart(!updateCart);
        toast("Thêm vào giỏ hàng", {
          style: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid white"
          }
        });
      },
      (error) => toast("Lỗi khi thêm vào giỏ hàng")
    );
  };

  return (
    <div className="grid grid-cols-4 mt-2">
      <div className="hidden md:flex flex-col mr-10 gap-2">
        {restaurant?.menu?.map((item, index) => (
          <Button
            variant="link"
            key={index}
            className="flex justify-start text-black-400 "
            onClick={() => FilterMenu(item.categories)}
          >
            {item.categories}
          </Button>
        ))}
      </div>
      <div className="md:col-span-3 col-span-4">
        {menuItemList && menuItemList.categories ? (
          <h2 className="font-extrabold text-lg">{menuItemList.categories}</h2>
        ) : (
          <h2 className="font-extrabold text-lg">No categories found</h2>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {menuItemList?.menuItem?.map((item, index) => (
            <div
              key={index}
              className="p-2 flex gap-3 border rounded-xl cursor-pointer product-item"
            >
              <Image
                src={item?.productImage?.url}
                alt={item.name}
                width={120}
                height={120}
                className="object-cover w-[120px] h-[120px] rounded-xl"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold">{item.name}</h2>
                <h2>{item.price}</h2>
                <h2 className="tesm-sm text-gray-400 line-clamp-2">
                  {item.description}
                </h2>
                <SquarePlus
                  className="cursor-pointer"
                  onClick={() => addToCartHandler(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .product-item {
          border: 1px solid #ddd;
        }

        .product-item:hover {
          border-color: red; 
        }
      `}</style>
    </div>
  );
}

export default MenuSection;
