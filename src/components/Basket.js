import React from "react"

class Basket extends React.Component {
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.receiveSubmittedOrder(this.props.currentBasket)
  }

  handleClick(event){
    console.log('delete value', event.target.value);

  }

  render(){
    console.log('basket', this.props.currentBasket);
    const currentBasketArr = Object.values(this.props.currentBasket)

    // get the current price of the order from the menu item objects add this up and include total it up.
    const deliveryCost = 300
    let total = currentBasketArr.map(menuItemId => {
        // const menuItem = menu.find(item => item.id === parseInt(menuItemId, 10));
        // const quantity = basket[menuItemId];
        // return quantity * menuItem.price;
    })
        .reduce((acc, item) => acc + item, 0);

    total = (total + deliveryCost)/100

    return(
      <div className="basket">
        <h1>Your Basket</h1>
        <form onSubmit={this.handleSubmit}>
          {currentBasketArr.map(item => (
            <div className="basket__item" key={item.menuItemName}>
              <p>{item.quantity} x {item.menuItemName}</p>
              <button type="click" onClick={this.handleClick}>Remove</button>
            </div>
          ))}

          <p>+ £3 delivery fee</p>
          <p>Basket total: £{total.toFixed(2)}</p>
          <button type="click">Clear Basket</button>
          <button type="submit">Place Order</button>
        </form>
      </div>
    )
  }
}
export default Basket
