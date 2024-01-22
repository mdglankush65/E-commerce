import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

const Bg = styled.div`
  margin-bottom: 50px;
`;
export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <Bg>
      <Header />
      <ToastContainer />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </Bg>
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