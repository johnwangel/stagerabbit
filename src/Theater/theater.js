import React, {Component} from 'react';
import { connect } from 'react-redux';

import TheaterInfo from "./theaterInfo";

class Theater extends Component {
  constructor(props) {
    super(props);
    this.state=this.props.theater;
    this.state.edit='';
    this.handleChange = this.handleChange.bind(this);
    this.edit_it = this.edit_it.bind(this);
    this.submit_it = this.submit_it.bind(this);
  }

  updateInputs(a,b){
    if (a !== b) this.setState( this.props.theater )
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  edit_it(data) {
    this.setState({edit: data})
  }

  submit_it(data) {
    data.theater_id=this.props.theater.id;
    this.props.cb(data);
    this.setState({edit: ''});
  }

  render() {
    if ( !(this.props.theater.id) ) return null;
    const x = this.props.theater;
    this.updateInputs(this.props.theater.id, this.state.id)
    const y = this.state;
    const keys= Object.keys( this.props.theater );
    console.log('keys',keys)

    return (
      <div key={this.props.theater.id}>
              { keys.map((keyname, keyindex ) => {
                  const _id = `${keyname}_t1`;
                  const _name = keyname === 'website'
                                ? <a key={ this.props.theater.id+'-i' } target="_blank" href={x[keyname]}>{x[keyname]}</a>
                                : x[keyname];
                  const edit = this.state.edit===keyname ? true : false;

                  if (keyname==='createdAt' || keyname==='updatedAt' || keyname==='edit') return null;

                  return <TheaterInfo
                              key={keyindex}
                              id={_id}
                              label={keyname}
                              value={_name}
                              edit={edit}
                              submit_it={this.submit_it}
                              edit_it={this.edit_it}/>
              })}
      </div>
    );
  }
}

export default Theater;