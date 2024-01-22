"use client";
import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const Bg = styled.div`
  margin-bottom: 50px;
`;

const Options = styled.div`
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  background-color:black;
  padding: 3px 0px;
  display: flex;
  justify-content: space-around;
`;

const Btn = styled.div`
  cursor: pointer;
  color:white;
  border-right: 2px solid #fff;
  padding-right: 25px;
  font-size: 15px;

  &:hover {
    color: #abcdef
  }
  &:active{
    color: #abcdef;
  }
  ${(props) =>
    props.isLast &&
    `border-right: none;`
  }
`;

export default function categories({ products }) {
  const [type, setType] = useState('');
  const [data, setData] = useState(products);
  const category = ['Ear-Phone', 'Head Phone', 'Ear Buds', 'Mac-Book', 'Laptop', 'Android', 'I-Phone'];
  const handle = (val) => {
    setData(products.filter(value => value.cluster === val));
  }
  useEffect(() => {
    handle(type);
  }, [type]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Center>
        <Bg>
          <Title>Categories</Title>
          <Options>
            {category.map((val, index) =>
              <Btn key={val} isLast={index === category.length - 1} onClick={() => setType(val)} >{val}</Btn>
            )
            }
          </Options>
        </Bg>
        {data.length ? <ProductsGrid products={data} /> : <ProductsGrid products={products} />}
      </Center>
    </>
  )
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