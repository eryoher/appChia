import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Product extends Component {

    constructor(props){
        super(props)
        this.state = { 'nextPage' : 0 }
    }

    componentWillMount(){
        this.props.getProduct( this.props.params.id );    
        this.props.fetchDataProducts();
    }

    renderCategories(){
        const { product } = this.props;
        var rows = [];
        
        product.categories.forEach(category => {
            rows.push(
                <div className="col-12" key={category.id}>
                    <div className="category-item pl-2 mb-3"> 
                        <Link to={`/category/${category.id}`}>                        
                            {category.name}                        
                        </Link>
                    </div>
                </div>
             );
        });

        return rows
    }

    componentDidUpdate(prevProps, prevState){
        const { products } = this.props
        
        if(  this.state.nextPage == 0 ){       
            if( products !== undefined ){
                //primera pagina
                var inicio = products[0].id
                var next = 0;            

                products.forEach((product, index) => {                    
                    if( inicio > product.id ){
                        inicio = product.id
                    }
                    if( product.id == this.props.params.id ){
                        next = (products[index + 1] !== undefined) ? products[index + 1].id : inicio

                    }
                });

                console.log('actual:::', this.props.params.id);
                console.log('next >>>>', next);
                this.setState({'nextPage' : next});                
            }
        }
        
    }

    handleRedirect( path ){
        window.location.href = path;                
    }

    render() {
        const { product } = this.props
        return (
            <div className="product-container ">
                <div className="container">
                    <div className="title text-center pt-5 pb-5">
                        <div className="title-product">
                            {(product !== undefined) ? product.name : null}
                        </div>
                        <div>CATEGORIA</div>
                        
                    </div>
                    <div className="categories-list row">  
                    { ( this.props.product !== undefined ) ? this.renderCategories() : null }             
                    </div>               
                </div>
                <div className="container mt-5">                    
                    <div className="footer-btns row">                        
                        <div className="start col-6" onClick={ () => this.handleRedirect('/')} />                                                
                        <div className="next col-6" onClick ={ () => this.handleRedirect(`/product/${this.state.nextPage}`) } />
                        
                    </div>
                </div>                    
            </div>
        )
    }
}

function mapStateToProps(state){    
    return {
        product : state.data.product,
        products : state.data.products,
    }
}

export default connect (mapStateToProps, actions)(Product);