import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import BusinessItem from "./BusinessItem";
import BusinessItemSkelton from "./BusinessItemSkelton";
 
function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [bussinessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && setCategory(params.get("category"));
    params && getBussiness(params.get("category"));
  }, [params]);

  const getBussiness = (category_) => {
    setLoading(true);
    GlobalApi.GetBussiness(category_).then((resp) => {
      setBusinessList(resp?.restaurants);
      setLoading(false);
    });
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Popular {category} Restaurants</h2>
      <h2 className="font-bold text-primary">{bussinessList?.length} Results</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3">
        {!loading
          ? bussinessList.map((restaurant) => (
              <BusinessItem key={restaurant.id} bussiness={restaurant} />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <BusinessItemSkelton key={index} />
            ))}
      </div>
    </div>
  );
}

export default BusinessList;
