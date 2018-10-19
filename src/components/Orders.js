import React from "react"

class Orders extends React.Component {
  render(){


    const ordersArr = Object.values(this.props.orders)
    return(
    <div className="orders">
      <h2>Orders</h2>
      {ordersArr.map(order => (
        <div className="orders__item" key={order.id}>
          <p>Order Id: {order.id}</p>
          <button>Remove</button>
        </div>
      ))}
    </div>)


  }


}

export default Orders
