"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cart from "./Cart";

function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log("Chờ một chút");
    user && GetUserCart();
  }, [updateCart && user]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
        setCart(resp?.userCarts);
      }
    );
  };

  return (
    <div className="flex justify-between items-center p-6 md:px-20 shadow-sm">
      <Link href="/?category=all">
          <Image src="/logo.png" alt="logo" width={150} height={150} />
      </Link>
      <div className="flex border p-2 rounded-lg bg-gray-180 w-96">
        <input type="text" className="bg-transparent w-full outline-none" />
        <Search />
      </div>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-2 items-center cursor-pointer">
                <ShoppingCart />
                <label className="p-1 px-2 rounded-full bg-slate-200">
                  {cart?.length}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-white shadow-md rounded-md">
              <Cart cart={cart}/>
            </PopoverContent>
          </Popover>

          <UserButton />
        </div>
      ) : (
        <div className="flex gap-5">
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
