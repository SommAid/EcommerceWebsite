'use client'
import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import useSWR from 'swr'
import {useEffect} from "react";


export default function Orders() {
  const {data: data, error } = useSWR(`/api/admin/orders`);
  if (error) return 'An error has occurred.'
  console.log("DATAAAAAAA: ", data);

  if(data) {
    let orders = data[0];
    let names = data[1];
    console.log("ORDERS: ", orders);
    console.log("NAMES: ",names);
    if (!orders) return 'Loading...'

    return (
        <div>
          <h1 className="py-4 text-2xl">Orders</h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
              </tr>
              </thead>
              <tbody>
              {orders.map((order: any) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{names[order.user_id]}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid && order.paidAt
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                    </td>
                    <td>
                      {order.isDelivered && order.deliveredAt
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`} passHref>
                        Details
                      </Link>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
  else {
    let orders: any = [];
    let names: any = [];
  }

  console.log("DATAAAAAA", data);





}
