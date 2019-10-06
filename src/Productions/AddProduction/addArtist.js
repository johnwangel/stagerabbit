import React, {Component} from 'react';
import { connect } from 'react-redux';

import { process_submit } from '../../constants/constants';

class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_title: (this.props.editmode) ? 'Edit Artist' : 'Add an Artist',
      show_select: true,
      show_field: false,
      fname : (this.props.item) ? this.props.item.fname : '',
      lname : (this.props.item) ? this.props.item.lname : '',
      itemid : `${this.props.type}_${this.props.num}`,
      selid : `sel_${this.props.type}_${this.props.num}`,
      fnameid : `fname_${this.props.type}_${this.props.num}`,
      lnameid : `lname_${this.props.type}_${this.props.num}`,
      defaultvalue: (this.props.item) ? this.props.item.artist_id : '0',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputname = this.inputname.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.newArtist && !prevProps.newArtist && this.props.newArtist.aid === this.state.itemid ){
      this.setState( { defaultvalue: `${this.props.newArtist.nid}` } );
    }
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  onDropdownSelected(e) {
    if (e.target.value === '-1') {
      this.setState({ show_field : true, show_select : false })
    } else {
      this.setState({ defaultvalue : e.target.value })
    }
  }

  handleSubmit() {
    const data={
                fname : this.state.fname,
                lname : this.state.lname,
                aid   : this.state.itemid,
                editmode : this.props.editmode,
                artist_id: this.state.defaultvalue
              };
    this.props.addArtistCB( data );
    this.setState({ show_field : false, show_select : true });
  }

  inputname(){
    this.setState({ show_field : true, show_select : false })
  }

  removeArtist(){
    const data =  {artist_id: this.state.defaultvalue, type: this.props.type };
    if (this.props.pid){
      data.assoc='production';
      data.assoc_id=this.props.pid.production_id;
    } else if (this.props.sid){
      data.assoc='show';
      data.assoc_id=this.props.sid;
    }
    this.props.removeArtistCB( data );
  }

  render() {
    return ( <div>
              { (this.state.show_select)
               ? <div id={this.state.itemid} className="artist_item">
                    <span className="runin">{this.props.title} {this.props.num}:</span>
                    <select
                        value={ this.state.defaultvalue }
                        id={this.state.selid}
                        type="select"
                        name={this.state.selid}
                        onChange={this.onDropdownSelected}>
                      {this.props.sel}
                    </select>
                    <span className="list clickable" onClick={() => { this.inputname() }}>{ this.state.edit_title }</span>
                    { (this.state.edit_title === 'Edit Artist')
                        ? <span className="list clickable" onClick={() => { this.removeArtist() }}>Remove</span>
                        : null
                    }
                  </div>
                : null
              }

              { (this.state.show_field)
                ? <div id={`form-${this.state.itemid}`}>
                    <div>
                        <span className="runin">First Name:</span>
                        <input
                            type="text"
                            className="person"
                            key={this.state.fnameid}
                            id={this.state.fnameid}
                            name="fname"
                            value={this.state.fname}
                            onChange={this.handleChange}  />
                      </div>
                      <div>
                        <span className="runin">Last Name:</span>
                        <input
                            type="text"
                            className="person"
                            key={this.state.lnameid}
                            id={this.state.lnameid}
                            name="lname"
                            value={this.state.lname}
                            onChange={this.handleChange} />
                    </div>
                    <div className='submit_me' value="Submit" onClick={ this.handleSubmit }>Submit</div>
                  </div>
                : null
              }
            </div>
    );
  }
}

export default AddArtist;

