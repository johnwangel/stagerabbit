import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {  allTheaters, alterTheater } from './actions';
import { GET_POST_HEADER, URL } from '../constants/constants.js';
import { process_submit } from '../constants/constants';

class TheaterEmails extends Component {
  constructor(props) {
    super(props);

    this.state={ theaters: this.props.Theater.length }

    this.props.allTheaters();

    this.props.Theater.forEach(thing => {
     this[`${thing.id}_ref`] = React.createRef()
    });

    this.handleDelete=this.handleDelete.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let body = process_submit(e.target.elements);
    body.field='email';
    let id_key=Object.keys(body)[0];
    let id = id_key.split('_')[1];
    let pos = id_key.split('_')[2];
    body.all=true;
    body.theater_id=parseInt(id);
    body.value=body[id_key];
    body.pos=parseInt(pos);
    this.props.alterTheater( body );
    window.location.reload(false);
  }

  handleDelete(item){
    if (window.confirm('Are you sure you want to delete?')){
      GET_POST_HEADER.body = JSON.stringify({theater_id:item})
      fetch(`${URL}theaters/delete_theater`, GET_POST_HEADER)
      .then(response => response.json())
      .then(data => {
        window.location.reload(false);
      })
      .catch( err => console.log(err.message));
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  render() {
    console.log('theaters',this.props)
    return ( <div class="all_theaters">
              { (this.props.Theater && this.props.Theater.length>0)
                ? this.props.Theater.map( (item, idx) => {
                    let this_email='';
                    if (item.email!=null) this_email=item.email;
                    return  <div className='email_item'>
                              <span className="trash" onClick={ () => this.handleDelete(item.id) }>&#128465;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link className='website' to={`/theater/${item.id}`}>{item.id}</Link>{item.name}, {item.city}, {item.state_abbr}
                              <a className='website' target='_blank' href={ item.website }>{ item.website }</a>
                              <form id={ idx } onSubmit={this.handleSubmit}>
                                <input id={`update_${item.id}_${idx}`} ref={this[`${item.id}_ref`]} />&nbsp;&nbsp;&nbsp;
                                <button className="update" name='submit' id={`del_${item.id}`}>&#10004;</button>
                              </form>
                            </div>
                  })
                : null
              }
             </div>
    )
  }
}


const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    allTheaters: () => {
      dispatch( allTheaters() )
    },
    alterTheater: ( body ) => {
      dispatch( alterTheater( body ) )
    }
  }
}

export default TheaterEmails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TheaterEmails);
