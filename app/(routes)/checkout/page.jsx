"use client";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Loader } from "lucide-react";
import { toast } from "sonner";

function Checkout() {
  const params = useSearchParams();
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [fee, setFee] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params.get("restaurant"));
    user && GetUserCart();
  }, [user, updateCart]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
        setCart(resp?.userCarts);
        calculateTotalAmount(resp?.userCarts);
      }
    );
  };

  const calculateTotalAmount = (cart_) => {
    let total = 0;
    cart_.forEach((item) => {
      total = total + item.price;
    });
    setSubTotal(total);
    setTaxAmount(total * 0.4);
    setFee(total * 0.1);
    setTotal(total * 0.4 + total * 0.1);
  };

  const addToOrder = () => {
    setLoading(true);
    const data = {
      email: user.primaryEmailAddress.emailAddress,
      orderAmount: total,
      restaurantName: params.get("restaurant"),
      userName: user.fullName,
      phone: phone,
      note: note,
      date: date,
      zipCode: zip,
    };
    GlobalApi.CreateNewOrder(data).then(
      (resp) => {
        const resultId = resp.createOrder?.id;
        if (resultId) {
          cart.forEach((item) => {
            GlobalApi.UpdateOrderToAddOrderItems(
              item.productName,
              item.price,
              resultId,
              user?.primaryEmailAddress.emailAddress
            ).then(
              (result) => {
                console.log(result);
                setLoading(false);
                toast("Tạo đơn hàng thành công", {
                  style: {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid white",
                  },
                });
                setUpdateCart(!updateCart);
              },
              (error) => {
                setLoading(false);
              }
            );
          });
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-5">Thanh toán</h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Thông tin cá nhân</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Họ & tên"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Mã đặt"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              type="date"
              placeholder="Ngày"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Ghi chú"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="border-gray-300 border-2 p-2">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Tổng số giỏ hàng ({cart?.length})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="flex justify-between font-bold">
              Tổng cộng: <span>{subTotal} đ</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Đặt cọc (40%): <span>{taxAmount} đ</span>
            </h2>
            <h2 className="flex justify-between">
              Phí đặt bàn (10%): <span>{fee} đ</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Tổng cộng: <span>{total} đ</span>
            </h2>
            <Button
              onClick={() => addToOrder()}
              className="font-bold text-white mt-5"
            >
              {loading ? <Loader className="animate-spin" /> : "Thanh toán"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
