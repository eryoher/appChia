import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div className="main-content">        
        <div className="content-body">        
            { 
              this.props.children 
            }  
        </div>        
      </div>
    )
  }
}
