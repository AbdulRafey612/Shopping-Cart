import React from 'react';

class Filter extends React.Component {

	render(){
		return (
			<div className="row" id="Filter">
			<div className="col-xs-1"></div>
			<div className="col-md-3 d-flex justify-content-center">
			<p id="label" className="btn btn-danger">{this.props.count} products found</p>
			</div>
			<div className="col-md-3">
			<p id="label" className="btn btn-danger">Brand:</p>
			<select onChange={this.props.handleChangeCompany}>
			<option>Select</option>
			<option value="Rado">Rado</option> 
			<option value="Patek Phillip">Patek Phillip</option>
			<option value="All">All</option>
			</select>
			</div>
			<div className="col-md-4">
			<p id="label" className="btn btn-danger">Price:</p> 
			<input id="min" onChange={this.props.handleChangePriceMin}></input>
			-
			<input id="max" onChange={this.props.handleChangePriceMax}></input>
			</div>
			</div>

			);
	}

}
export default Filter;