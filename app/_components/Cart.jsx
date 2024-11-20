import React, { useContext } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "../_utils/GlobalApi";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Cart({ cart }) {
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  const CalculateCartAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });
    return total.toFixed(2);
  };

  const RemoveItemFromCart = async (id) => {
    try {
      await GlobalApi.DeleteItemFromCart(id);
      toast("Xóa sản phẩm!", {
        style: {
          backgroundColor: "white",
          color: "black",
          border: "1px solid white",
        },
      });
      setUpdateCart(!updateCart);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      toast("Đã xảy ra lỗi khi xóa sản phẩm!", {
        style: {
          backgroundColor: "white",
          color: "black",
          border: "1px solid white",
        },
      });
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold">{cart[0]?.restaurant?.name}</h2>
        <div className="mt-5 flex flex-col gap-3">
          <h2 className="font-bold">Giỏ hàng</h2>
          {cart &&
            cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between gap- items-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px] rounded-lg object-cover"
                  />
                  <h2 className="text-sm">{item.productName}</h2>
                </div>
                <h2 className="text-sm font-bold flex gap-2">{item.price}đ</h2>
                <X
                  className="h-4 w-4 text-red-500"
                  onClick={() => RemoveItemFromCart(item.id)}
                />
              </div>
            ))}
          <Link href={"/checkout?restaurant="+cart[0]?.restaurant?.name} className="w-full">
            <Button className="text-white w-full">
              Thanh toán: {CalculateCartAmount()}đ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
