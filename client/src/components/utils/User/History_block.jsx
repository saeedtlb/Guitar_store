import React from 'react';
import moment from 'moment';

const History = ({ products }) => {
  const renderBlocks = () =>
    products.map((product, i) => (
      <tr key={i}>
        <td>{product.porder}</td>
        <td>{moment(product.dateOfPurchase).format('MM-DD-YYYY')}</td>
        <td>
          {product.brand} {product.name}
        </td>
        <td>$ {product.price}</td>
        <td>{product.quantity}</td>
      </tr>
    ));
  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default History;
