import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = { 'nextPage': 0 }
    }

    componentWillMount() {
        this.props.getCategory(this.props.params.id);
    }

    componentDidUpdate() {
        const { category } = this.props

        if (this.state.nextPage == 0) {
            if (category !== undefined) {
                var categories = category.product.categories;
                //primera pagina
                var inicio = categories[0].id
                var next = 0;

                categories.forEach((catg, index) => {
                    if (inicio > catg.id) {
                        inicio = catg.id
                    }
                    if (catg.id == this.props.params.id) {
                        next = (categories[index + 1] !== undefined) ? categories[index + 1].id : inicio
                    }

                });

                //console.log('actual:::', this.props.params.id);
                //console.log('next >>>>', next);
                this.setState({ 'nextPage': next });
            }
        }

    }
    renderItems() {
        const { category } = this.props;
        var rows = [];
        const divList = (category.product.id == 1 || category.product.id == 5) ? true : false
        const classDiv = (divList) ? 'col-12' : 'col-12 col-sm-12 col-md-6 col-lg-6 col-lx-6 mt-5'
        const classItem = (divList) ? 'category-item' : 'item'
        category.items.forEach((item, index) => {
            rows.push(
                <div className={`${classDiv}`} key={item.id}>
                    <Link to={`/item/${item.id}`}>
                        <div className={`${classItem}`}>
                            <p className="overflow-wrap text-center">
                                {(!divList) ? item.name.split(' ').map(function (item, key) {
                                    return (
                                        <span key={key}>
                                            {item}
                                            <br />
                                        </span>
                                    )
                                }) : item.name}
                            </p>
                        </div>
                    </Link>
                </div>
            );
        });

        return rows
    }

    handleRedirect(path) {
        window.location.href = path;
    }

    render() {
        const { category } = this.props
        const productId = (category !== undefined) ? category.product.id : null;

        return (
            <div className="category-container">
                <div className="container">
                    <div className="title-product pt-5">
                        {(category !== undefined) ? category.product.name : null}
                    </div>

                    <div className="title-category">
                        {(category !== undefined) ? category.name : null}
                    </div>

                    <div className="items-list row justify-content-start">
                        {(this.props.category !== undefined) ? this.renderItems() : null}
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row banner"></div>
                    <div className="footer-btns container row">
                        <div className="start col-4 col-sm-4 col-md-4 col-lg-4 col-lx-4" onClick={() => this.handleRedirect(`/product/${productId}`)} />
                        <div className="homePage col-4 col-sm-4 col-md-4 col-lg-4 col-lx-4" onClick={() => this.handleRedirect(`/`)} />
                        <div className="next col-4 col-sm-4 col-md-4 col-lg-4 col-lx-4" onClick={() => this.handleRedirect(`/category/${this.state.nextPage}`)} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        category: state.data.category,
    }
}

export default connect(mapStateToProps, actions)(Category);
