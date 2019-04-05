import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import { Player, ControlBar, PlayToggle } from 'video-react';


class Products extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { 'closePopup': false, 'player': [], videoEnded: false }

    }

    componentDidUpdate() {
        if (!this.state.closePopup && !this.state.videoEnded) {
            //this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        }

        if (!this.state.closePopup) {
            if (this.state.player.currentTime > 0 && this.state.player.ended) {
                this.setState({ closePopup: true })
                sessionStorage.setItem('videoEnded', true);
            }
        }
    }

    componentWillMount() {
        this.props.fetchDataProducts();
        var key = sessionStorage.getItem('videoEnded');
        if (key) {
            this.setState({ 'videoEnded': true });
        }
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
    }

    renderProducts() {
        const { products } = this.props
        var rows = []

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            rows.push(
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-lx-6 text-center product-list" key={product.id} >
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


    renderPopup() {
        setTimeout(() => {
            this.setState({ videoEnded: true });
            sessionStorage.setItem('videoEnded', true);
        }, 7000);
        return (
            <div className="popup-video">
                <div className="reproductor text-center">
                    <img src='../../img/home-video.gif' className="img-home pt-2 pb-2" />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="products-container">
                <div className="header" />
                <div className="container">
                    <div className="category-list">
                        <div className="row ">
                            {(this.props.products !== undefined) ? this.renderProducts() : null}
                        </div>
                        {!this.state.videoEnded && this.renderPopup()}
                    </div>
                </div>
                <div className="footer" />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.data.products,
    }
}

export default connect(mapStateToProps, actions)(Products);
