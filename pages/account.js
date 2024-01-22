import Header from "@/components/Header";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import Title from "@/components/Title";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Bg = styled.div`
  display:flex;
  justify-content:space-between;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

export default function account(orders) {
    return (
        <>
            <Header />
            <ToastContainer />
            <Center>
                <Title>Welcome! Guest</Title>
                <Bg>
                    {orders.products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Postal Code</th>
                                <th>Street Address</th>
                                <th>Country</th>
                                <th>Payment Status</th>
                                <th>Cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.products.map(order => (
                                    <tr key={order._id}>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.city}</td>
                                    <td>{order.postalCode}</td>
                                    <td>{order.streetAddress}</td>
                                    <td>{order.country}</td>
                                    <td>{order.paid?'  Completed  ':'   Cancelled  '}</td>
                                    {/* <td> */}
                                        {/* <Table>
                                            <thead>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </thead>
                                            <tbody>
                                                {order.line_items.map( item=>
                                                    <tr key={item._id}>
                                                        <td>{item.price_data.product_data.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price_data.unit_amount}</td>
                                                        <td>{item.quantity * item.price_data.unit_amount}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                        <ul>
                                            <li></li>
                                        </ul> */}
                                    {/* </td> */}
                                    <td>{order.line_items.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    )}
                </Bg>
            </Center >
        </>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const orders = await Order.find({}, null, { sort: { '_id': -1 } });
    return {
        props: {
            products: JSON.parse(JSON.stringify(orders)),
        }
    };
}