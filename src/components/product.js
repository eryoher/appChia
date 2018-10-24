import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.scss';
import Slider from "react-slick";

class Product extends Component {

    constructor(props){
        super(props)
        this.state = { 'nextPage' : 0 }
    }

    componentWillMount(){
        this.props.getProduct( this.props.params.id );
        this.props.fetchDataProducts();
        this.props.getBanners();

    }

    renderCategories(){
        const { product } = this.props;
        var rows = [];        
        var background = ''
        if( this.props.params.id == 1 ){
            background = '../../../img/titulos_noticias.png';
        }else{
            background = '../../../img/fondo_categorias.png';
        }

        product.categories.forEach(category => {
            rows.push(
                <div className="col-12" key={category.id}>
                    <Link to={`/category/${category.id}`}>
                        <div className="category-item pl-2 mb-3" style={{ backgroundImage: `url(${background})`}} >
                            {category.name}
                        </div>
                    </Link>

                </div>
             );
        });

        return rows
    }

    renderBaners(){
      const { banners } = this.props      
      var rows = []
      var settings = {
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay : true,
          width : '100%'
      }

      banners.forEach(banner => {
            if(banner.active){
                console.log(banner.image);
                rows.push(
                    <div key={banner.id} className="conten-slide">
                      <div className="my-slide-content text-center">
                          <img src={banner.image} alt="" className="slider-img"/>
                      </div>
                    </div>
                );
            }
      });
      if (rows.length > 0) {
        return (
          <Slider {...settings}>
              { rows }
          </Slider>
        )
      }else{
        return null;
      }
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
        const { product , banners} = this.props
        return (
            <div className="product-container ">
                <div className="container">
                    <div className="title text-center pt-5 pb-5">
                        <div className="title-product">
                            {(product !== undefined) ? product.name : null}
                        </div>
                        <div className="subtitle-product">CATEGORIA</div>


                    </div>
                    <div className="categories-list row">
                    { ( this.props.product !== undefined ) ? this.renderCategories() : null }
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row banner">
                      { banners !== undefined && this.renderBaners() }
                    </div>
                    <div className="footer-btns row">
                        <div className="start col-4" onClick={ () => this.handleRedirect('/')} />
                        <div className="homePage col-4" onClick={ () => this.handleRedirect(`/`)} />
                        <div className="next col-4" onClick ={ () => this.handleRedirect(`/product/${this.state.nextPage}`) } />

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
        banners : state.data.banners,
    }
}

export default connect (mapStateToProps, actions)(Product);
