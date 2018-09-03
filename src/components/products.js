import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import { Player, ControlBar, PlayToggle} from 'video-react';


class Products extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { 'closePopup': false, 'player' : []}

    }

    componentDidUpdate(){
        if( !this.state.closePopup ){
            this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        }

        if( !this.state.closePopup ){
            if( this.state.player.currentTime > 0 && this.state.player.ended ){
                this.setState({ closePopup : true })
            }
        }
    }

    componentWillMount(){
        this.props.fetchDataProducts();    
    }


    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
        player: state
        });
    }

    renderProducts(){
        const { products } = this.props
        var rows = []

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            rows.push(            
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-lx-6 text-center product-list" key={product.id} >
                    <Link to={`product/${product.id}`}>
                        <div className="product ">
                            {product.name}
                        </div>
                    </Link>
                </div>
            );
            
        }
    
        return rows;    
    }
 
    render() {
        
        return (
            <div className="products-container">        
                <div className="header" />
                <div className="container">
                    <div className="category-list row ">
                        { (this.props.products !== undefined) ? this.renderProducts() : null }
                    </div>
                    { !this.state.closePopup && <div className="popup-video">
                        <div className="reproductor">
                            <Player
                                autoPlay
                                fluid = {false}
                                width='100%'
                                height='100%'
                                ref = 'player'
                            >
                                <source src="../../videos/Institucional.mp4" />
                                <ControlBar autoHide={false} disableDefaultControls={true}>
                                    <PlayToggle />
                                </ControlBar>
                            </Player>
                        </div>
                    </div>}   
                </div>
                <div className="footer" />
            </div>
        )
    }
}

function mapStateToProps(state){    
    return {
      products : state.data.products,
    }
  }
  
  export default connect (mapStateToProps, actions)(Products);