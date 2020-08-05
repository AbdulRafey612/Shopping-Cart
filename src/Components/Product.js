import React from 'react';

class Product extends React.Component {
  
  render(){
    if(this.props.products.length === 0){
      console.log("No elemnts were found");
    }  
      const Product = this.props.products.map(products =>(
          
          <div className="col-md-4">
          <div className="imgBx">
            <img src="popular1.png" />
          </div>
          <button className="btn btn-danger" id="add-button" 
          onClick={(e)=>{this.props.handleAddToCart(e,products)}}>
          Add to cart
          </button>
          <h2>{products.title}</h2>
          <p>{products.price}</p>
          </div>))
    return (
           <div className="container" id="card">

          {Product}
          </div>
          );
  }
}
export default Product;