import React from 'react';
import MenuItem from './MenuItem';

import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super();

    this.state = { menu: {} }
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

  render(){
    const menuArr = Object.values(this.state.menu)
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

      </div>
    )
  }
}

export default App;
