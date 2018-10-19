import React from 'react';
import MenuItem from './MenuItem';
import Basket from './Basket.js';
import Orders from './Orders.js';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = { menu: {} }

    this.state = { menu: {}, currentBasket: [], totalBasket: [], orders: [] }

    this.receiveBeerQuantity = this.receiveBeerQuantity.bind(this)
    this.receiveSubmittedOrder = this.receiveSubmittedOrder.bind(this)
    this.updateTotalBasket = this.updateTotalBasket.bind(this)
  }

  componentDidMount(){
    fetch("/api/menu")
    .then(response => response.json())
    .then(menu => {
      this.setState({
        menu: menu
      }, () => console.log(this.state.menu))

    })
  }

  receiveBeerQuantity(beer, newBeerQuantity){

    if(newBeerQuantity > 0){
      console.log('more than zero');
      console.log('what is the result', this.state.currentBasket.menuItemId);

      const beerOrder = {
        [beer.id]: {
          menuId: beer.id,
          menuItemName: beer.name,
          quantity: newBeerQuantity
        }
      }
      const updatedOrder = Object.assign({}, this.state.currentBasket, beerOrder)

      this.setState({
        currentBasket: updatedOrder
      },
      () => console.log(this.state.currentBasket))
    } else {
      const orderToUpdate = this.state.currentBasket;
      delete orderToUpdate[beer.id];
      console.log('before', this.state.currentBasket);

      this.setState({
        currentBasket: this.state.currentBasket
      })
      console.log('after', this.state.currentBasket);
  }
}

  updateTotalBasket(){
    const deliveryCost = 300
    this.setState({
      totalBasket: totalBasket
    })
  }

  receiveSubmittedOrder(currentBasket){
    console.log('before', currentBasket)

    const submittedOrder = {
      items: currentBasket
    }

    console.log('reformat', submittedOrder)


    fetch('/api/purchase', {
      method: 'post',
      body: JSON.stringify(submittedOrder),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(function(response) {
    return response.json();
  }).then(order => {
    console.log('order', order);
    this.setState({
      orders: this.state.orders.concat(order)
    })

    console.log('all orders', this.state.orders);
  });


  }



  render(){
    const menuArr = Object.values(this.state.menu);
    const basketExists = !!this.state.currentBasket;

    return (
      <div>
        <header>
          <h1>Liquid dinner 🍻</h1>
        </header>
        <main className="main">

          <div className="main__brewery">
            <div className="main__pickBrewery">
              <h2>Pick your Brewery</h2>
              <select>
                <option value="Beavertown">Beavertown</option>
                <option value="The Kernel">The Kernel</option>
                <option value="Brew By Numbers">Brew By Numbers</option>
              </select>
            </div>

            <img src="static/img/d803f442866771.57da88db4d316.gif" />
            <div className="main__beers">
              {menuArr.map(beer => (
                <div key={beer.id}>
                  <MenuItem beer={beer} receiveBeerQuantity={this.receiveBeerQuantity}/>
                </div>
              ))}
            </div>
          </div>

        </main>

        <div className="dynamic">
          {basketExists ? (
            <Basket
              currentBasket={this.state.currentBasket}
              receiveSubmittedOrder={this.receiveSubmittedOrder}
            />
          ) : null}
            <Orders orders={this.state.orders} />
        </div>


      </div>
    )
  }
}

export default App;
