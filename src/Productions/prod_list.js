import React, {Component} from 'react';
import Productions from "./productions";
const moment = require('moment');

class ProdList extends Component {
  constructor(props) {
    super(props);
    this.state = { show_prods: 0 }
    this.toggleTime = this.toggleTime.bind(this);
  }

  toggleTime(which,number){
    switch (which){
      case 1:
        this.setState({show_prods:number});
        break;
      case 2:
        this.setState({show_events:number});
        break;
    }
  }

  new_prod(item,index){
    if (this.props.perm) {
      return <Productions
        idx={ index }
        uid={ this.props.User.uid }
        key={ `pr-${index}` }
        prod={ item }
        shows={ this.props.Shows }
        addShowCB={ this.props.add_show }
        addArtistCB={ this.props.addArtistCB }
        removeArtistShowCB={ this.props.removeArtistShowCB }
        removeArtistProdCB={ this.props.removeArtistProdCB }
        newArtist={ this.props.Shows.new_artist }
        edit_show={ this.props.edit_show }
        edit_prod={ this.props.edit_prod }
        clear_edit={ this.props.clear_edit }
        perm={ this.props.perm }
      />
    } else {
      return <Productions
        idx={ index }
        uid={ this.props.User.uid }
        key={ `pr-${index}` }
        prod={ item }
        perm={ this.props.perm }
      />
    }
  }

  render() {
    return (
      <>
        <h2 className="main-page main-column">{this.props.title}</h2>
        <div className="toggle">
          <div  id="upcoming1"
                className={ (this.state.show_prods===0) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(1,0) } }>
              Upcoming
          </div>
          <div  id="previous1"
                className={ (this.state.show_prods===1) ? "toggle-button active" : "toggle-button" }
                onClick={() => { this.toggleTime(1,1) } }>
              Previous
          </div>
        </div>
        { (this.props.Prods.upcoming.length > 0)
          ? <div className={ (this.state.show_prods===0) ? 'productions main-column' : 'productions main-column hide' }>
              { this.props.Prods.upcoming.map( ( item, index ) => this.new_prod(item,index) ) }
            </div>
          : <div className={ (this.state.show_prods===0) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No upcoming productions listed.</div></div>
        }

        { (this.props.Prods.previous.length > 0)
          ? <div className={ (this.state.show_prods===1) ? 'productions main-column' : 'productions main-column hide' }>
              { this.props.Prods.previous.map( ( item, index ) => this.new_prod(item,index) ) }
            </div>
          : <div className={ (this.state.show_prods===1) ? 'productions main-column' : 'productions main-column hide' }><div className="empty">No previous productions available.</div></div>
        }
      </>
    )
  }
}

export default ProdList;