import React from 'react';

class Cart extends React.Component {
	render(){
		let {cartItems} = this.props;
		return(
			<div className="col-md-4 alert alert-info">
			{cartItems.length===0?"Cart is empty":<p>You have {cartItems.length} items</p>}
			{(cartItems.length > 0 && 
				<div>
				<ul>
					{cartItems.map(item=>
						<li>
							<b>{item.title} X {item.count/2}</b>
							{console.log(item)}
							<button className="btn btn-danger" onClick={(e)=>{this.props.handleRemoveFromCart(e,item)}}>
							Remove
							</button>

						</li>
					)}
				</ul>
				</div>
			)}
			</div>
			)
	}
}

export default Cart;