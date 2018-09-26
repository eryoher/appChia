import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.scss';
import Slider from "react-slick";
import 'aframe';
import YouTube from 'react-youtube';
import "../../node_modules/video-react/dist/video-react.css";
import { Player, ControlBar, PlayToggle} from 'video-react';

class Item extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = { 'closePopup': true, 'nextPage' : 0 , 'player' : []}

    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
    }

    componentWillMount(){
        this.props.getItem( this.props.params.id );
    }

    componentDidUpdate(){
        const { item } = this.props

        if( this.props.item !== undefined && !this.state.closePopup ){
           // this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
        }

        if(  this.state.nextPage == 0 ){
            if( item !== undefined ){
                var items = item.category.items;
                //primera pagina
                var inicio = items[0].id
                var next = 0;

                items.forEach((itm, index) => {

                    if( inicio > itm.id ){
                        inicio = itm.id
                    }
                    if( itm.id == this.props.params.id ){
                        next = (items[index + 1] !== undefined) ? items[index + 1].id : inicio
                    }

                });

                //console.log('actual:::', this.props.params.id);
                //console.log('next >>>>', next);
                this.setState({'nextPage' : next});
            }
        }

        if( !this.state.closePopup ){
            if( this.state.player.currentTime > 0 && this.state.player.ended ){
                this.setState({ closePopup : true })
            }
        }

    }

    renderCarousel(item){
        var pictures = item.assets;

        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay : true,
            customPaging: i => (
                <div className="dot-slick"
                    style={{
                        width: "10px",
                        height: "10px",
                        background: "#bbb",
                        borderRadius: "50%",
                        display: "inline-block",
                    }}
                />

            ),
        }

        if (pictures.length){
            return (
                <Slider {...settings}>
                    {this.divSlider(pictures)}
                </Slider>
            );
        }
    }

    divSlider(pictures){
        var rows = [];
        for (var key in pictures) {
            var picture = pictures[key];
            rows.push(
                <div key={key} className="conten-slide">
                <div key={key} className="my-slide-content text-center">
                    <img src={picture.path} alt="" className="slider-img"/>
                </div>
                </div>
            );

        }
        return rows;
    }

    handleRedirect( path ){
        window.location.href = path;
    }

    renderVideos(){
        const { item } = this.props
        var rows = [];
        var result = [];
        var exits = false
        var videos = [ 'video1','video2', 'video3' ] //numero de videos
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        };
        videos.forEach(video => {
            if(item[video] !== '' && item[video] !== null){
                exits = true;
                rows.push(
                    <div className="col-sm-12 col-md-6 col-lg-4 col-lx-4 video-item" key={video}>
                        <YouTube
                            videoId={item[video].split('v=')[1]}
                            opts={opts}
                        />
                    </div>
                )
            }
        });

        if(exits){
            result = (
                <div className="videos mt-5 col-12">
                    <div className="title mb-3">
                        Videos
                    </div>
                    <div className="video-list row">
                        {rows}
                    </div>
                </div>
            )
        }

        return result;
    }

    render() {
        const { item } = this.props
        const categoryId = ( item !== undefined ) ? item.category.id : null

        if( item === undefined){
            return(<div/>)
        }
        var video = item.category.product.video;

        return (
            <div className="item-container">
                <div className="container">
                    <div className="row">
                        <div className="title-header col-12 text-center mb-5 mt-5">
                            <div className="category-title">
                                {item.category.name}
                            </div>
                            <div className="item-title">
                                {item.name}
                            </div>
                        </div>
                        <div className="col-9 slider">
                            {this.renderCarousel(item)}
                        </div>
                        <div className="col-12 mt-4">
                            <div className="description mt-3 text-justify">
                                {item.description}
                            </div>
                        </div>
                        { this.state.closePopup && this.renderVideos() }
                        { this.state.closePopup && <div className="address-google col-12">
                            <div className="title col-12 text-center mb-3 mt-3">¡Cómo llegar!</div>
                            <div className="map">
                                <iframe
                                    height="100%"
                                    width="100%"
                                    className="embed-responsive-item"
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCHHIsAhcxJEV7KmBT4KWlRxf8FR4hLKKI&q=${item.address}`}>
                                </iframe>
                            </div>
                        </div>}
                        { this.state.closePopup &&
                            <div className="col-12 canvasimg mt-5 mb-5">
                                <div className="title">Recorrido</div>
                                <div className="title">Virtual</div>

                                <div className="picture-360">
                                    <a-scene embedded className="image">
                                            <img id="sky" src={item.img360} crossOrigin="anonymous" />
                                        <a-sky src="#sky" rotation="0 0 0"></a-sky>
                                    </a-scene>
                                </div>
                            </div>
                        }
                        { !this.state.closePopup  &&
                            <div className="video-popup col-12">
                                <div className="reproductor">
                                    <Player
                                        autoPlay
                                        fluid = {false}
                                        width='100%'
                                        height='100%'
                                        ref = 'player'
                                    >
                                        <source src={`../../videos/${video}`} />
                                        <ControlBar autoHide={false} disableDefaultControls={true}>
                                            <PlayToggle />
                                        </ControlBar>
                                    </Player>
                                </div>

                            </div>
                        }
                    </div>
                </div>
                { this.state.closePopup &&
                    <div className="container mt-5">
                        <div className="footer-btns row">
                            <div className="start col-6" onClick={ () => this.handleRedirect(`/category/${categoryId}`)} />
                            <div className="next col-6" onClick={ () => this.handleRedirect(`/item/${this.state.nextPage}`)} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        item : state.data.item,
    }
}
export default connect (mapStateToProps, actions)(Item);
