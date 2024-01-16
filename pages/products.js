import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const Bg = styled.div`
  margin-bottom: 50px;
`;

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <ToastContainer />
      <Center>
        <Bg>
          <Title>All products</Title>
          <ProductsGrid products={products} />
        </Bg>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}