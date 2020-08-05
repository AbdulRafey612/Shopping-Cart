import React from 'react';
import './App.css';
import Product from './Components/Product';
import Filter from './Components/Filter';
import Cart from './Components/Cart';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products:[],
      filteredProducts:[],
      cartItems:[]
    }
    this.handleChangeCompany = this.handleChangeCompany.bind(this);
    this.handleChangePriceMin = this.handleChangePriceMin.bind(this);
    this.handleChangePriceMax = this.handleChangePriceMax.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveCart = this.handleRemoveCart.bind(this);
  }

  componentWillMount(){
    fetch("http://localhost:8080/products").then(res=> res.json())
    .then(data => this.setState({
        products:data,
        filteredProducts:data,
        minPrice:""
      }

      ));
    if(localStorage.getItem("cartItems")){
      this.setState({cartItems : JSON.parse(localStorage.getItem("cartItems"))});
    }
  }
  handleChangeCompany(e){
    this.setState({company: e.target.value});
    console.log(e.target.value);
  
  }
  handleChangePriceMin(e){
    this.setState({minPrice: e.target.value});
    if(e.target.value !== ""){
      let arr = this.state.products.filter(product => { 
      return product.price > e.target.value;
      });
      console.log(arr);
      this.setState({
        filteredProducts:arr
      });

    }
  }
  handleChangePriceMax(e){
    this.setState({maxPrice: e.target.value});
    if(e.target.value !== ""){
      let arr = this.state.products.filter(product => { 
      return product.price < e.target.value;
      });
      console.log(arr);
      this.setState({
        filteredProducts:arr
      });

    } else {
      let arr = this.state.products;
      this.setState ({
        filteredProducts : arr
      });
      console.log(this.state.filteredProducts);
    }
  }

  handleAddToCart(e,product){
   console.log(e);
    this.setState(state=>{
      const cartItems = state.cartItems;
      
      let productAlreadyInCart = false;
      cartItems.forEach(item =>{
        if(item.id === product.id){
          productAlreadyInCart = true;
          item.count = item.count + 1;
        }
      });
      if(!productAlreadyInCart){
        cartItems.push({...product,count:1});
      }
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return cartItems;
    })

  }
    handleRemoveCart(e,item){
      const old_cartItems = this.state.cartItems;
      console.log(e.target.value);
      this.setState({
        cartItems : old_cartItems.filter(elm=>
        {
         
          return elm.id !== item.id;
        }

       )
      })
      localStorage.setItem("cartItems",this.state.cartItems);
      return(this.state.cartItems);
    }
    handleChangeCompany(e){
      const brand = e.target.value;
      if(brand == 'All'){
          this.setState({
            filteredProducts : this.state.products
          })
      } else {
          let arr = this.state.products.filter(product=>{
            return product.company == brand
          })
          this.setState({
            filteredProducts: arr
          })
      }
    }

  
  render(){
  return (
    <div>
    <nav className="navbar navbar-light" id="header">
    <div id="inner-header">
      <h1 className="logo">Ecommerce<bold>Site</bold></h1>
 
        <a className="items" href="">Store</a>
        <a className="items" href="">My Cart</a>
        <a className="items" href="">Contact Us</a>
  

    </div>
    </nav>
    <div id="main-wrapper"> 
        <div>
        <img src="ap.png" id="welcome-section"/>
        </div>
        <div className="store-wrapper">
        <h1 className="heading">Instock Items</h1>
        <p className="text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
        <br/>
        <Filter count={this.state.filteredProducts.length} price={this.state.price} company={this.state.company} 
        handleChangePriceMin={this.handleChangePriceMin} handleChangeCompany={this.handleChangeCompany}
        handleChangePriceMax={this.handleChangePriceMax}
        />
        <br/>
        <Product products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart}/>
        <Cart cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveCart}/>
        </div>
      </div>
    </div>


  );}
}


export default App;
