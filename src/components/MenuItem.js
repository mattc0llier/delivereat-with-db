import React from "react";

class MenuItem extends React.Component {
  constructor(){
    super();

    this.state = { order_quanity: 0}

    this.handleChange = this.handleChange.bind(this)

  }

  //for loop based on how much stock currently in
  //play then generate options from this. If more than 10 put 10+

  handleChange(event){

    this.setState({
      order_quanity: event.target.value
    }, () => this.props.receiveBeerQuantity(this.props.beer, this.state.order_quanity))

  }

  render(){


    return(
      <div className="menuItem">
        <img src={this.props.beer.image} />
        <h4>{this.props.beer.name}</h4>
        <h4>{this.props.beer.brewery}</h4>
        <h4>{this.props.beer.price /100}</h4>
        <div>
          <h2>Quantity:</h2>
          <form>
            <select onChange={this.handleChange}>
              <option value="0">none :( </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>

        </div>
      </div>
    )
  }

}

export default MenuItem;
