import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from "./MenuSection";
import ReviewSection from "./ReviewSection";
import AboutSection from "./AboutSection";

function RestroTabs({ restaurant }) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
      <TabsList>
        <TabsTrigger value="category">Menu</TabsTrigger>
        <TabsTrigger value="about">Giới thiệu</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <MenuSection restaurant={restaurant} />
      </TabsContent>
      <TabsContent value="about">
        <AboutSection restaurant={restaurant} />
      </TabsContent>
      <TabsContent value="reviews">
        <ReviewSection restaurant={restaurant} />
      </TabsContent>
    </Tabs>
  );
}

export default RestroTabs;
