import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import logo from "../assets/logo2.jpeg";
import MiniProductCard from "../components/MiniProductCard";
import SingleProductDetails from "../components/SingleProductDetails";
import PageNavigation from "../components/PageNavigation";
import BigImage from "../components/BigImage";
import AddToCart from "../components/AddToCart";
import ColorInputs from "../components/ColorInputs";
const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const { id } = useParams();

  const {
    id: alias,
    company,
    name,
    colors,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);
  if (isSingleLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <PageNavigation name={name} />
      <div className="start wrapper md:flex-row flex-col mt-20 gap-9">
        <div className="md:w-2/3 w-full">
          <div className="center lg:flex-row flex-col gap-6 w-full">
            <div className="">
              <BigImage images={image} />
            </div>

            <MiniProductCard images={image} />
          </div>
        </div>
        <div className="md:w-1/3 w-full ">
          <SingleProductDetails {...singleProduct} />

          {stock > 0 &&
          <AddToCart product={singleProduct} />}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
