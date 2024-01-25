import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Login from "./login";

const Bg = styled.div`
  margin-bottom: 50px;
`;
export default function HomePage({ featuredProduct, newProducts }) {
  const { loggedIn } = useContext(CartContext);
  return ( loggedIn?
    <Bg>
      <Header />
      <ToastContainer />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </Bg>
    : <Login/>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '65a54e1873c8f95d27ad1513';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 8 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}