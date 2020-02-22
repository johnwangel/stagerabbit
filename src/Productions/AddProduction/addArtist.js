import React, {Component} from 'react';
import { connect } from 'react-redux';

import { process_submit } from '../../constants/constants';

class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_title: (this.props.editmode && this.props.item) ? 'Edit Artist' : 'Create a New Artist',
      show_select: true,
      show_field: false,
      fname : (this.props.item) ? this.props.item.fname : '',
      lname : (this.props.item) ? this.props.item.lname : '',
      itemid : `${this.props.type}_${this.props.num}`,
      selid : `sel_${this.props.type}_${this.props.num}`,
      fnameid : `fname_${this.props.type}_${this.props.num}`,
      lnameid : `lname_${this.props.type}_${this.props.num}`,
      defaultvalue: (this.props.item) ? this.props.item.artist_id : '0',
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputname = this.inputname.bind(this);
    this.selectname = this.selectname.bind(this);
    this.removeArtist = this.removeArtist.bind(this);
    this.findArtist = this.findArtist.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.newArtist && this.props.newArtist !== prevProps.newArtist &&
        this.props.newArtist.aid === this.state.itemid ){
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
    if (this.state.lname==='') {
      this.setState({ error: 'You must enter a last name.' });
      return;
    }

    const data={
                fname : this.state.fname,
                lname : this.state.lname,
                aid   : this.state.itemid,
                editmode : this.props.editmode,
                artist_id: this.state.defaultvalue
              };

    let existing_artist=this.findArtist(data)
    if(existing_artist) {
      this.setState({
                      defaultvalue: existing_artist,
                      show_field : false,
                      show_select : true,
                      error: null
                    });
      return;
    }

    this.props.addArtistCB( data );
    this.setState({ show_field : false, show_select : true, error: null });
  }

  inputname(){
    this.setState({ show_field : true, show_select : false })
  }

  selectname(){
    this.setState({ show_field : false, show_select : true })
  }

  removeArtist(){
    const data =  {
                    number : this.props.num,
                    artist_id : this.state.defaultvalue,
                    type : this.props.type
                  };
    if (this.props.pid){
      data.assoc='production';
      data.assoc_id=this.props.pid.production_id;
    } else if (this.props.item.show_id){
      data.assoc='show';
      data.assoc_id=this.props.item.show_id;
    }
    this.props.removeArtistCB( data );
    this.setState({defaultvalue:0})

  }

  findArtist(data){
    let all=this.props.sel;
    let val=null;
    all.forEach( item => {
      if (item.props.children[2]===data.fname && item.props.children[0]===data.lname) val=item.props.value
    });
    return val;
  }

  render() {
    //console.log('props in add artist',this.props.sel)

    return ( <div className="subform-wrapper">
              { (this.state.show_select)
               ? <div id={this.state.itemid} className="form-group">
                    <div className="label">{this.props.title} {this.props.num}:</div>
                    <select
                        className="form-select wide"
                        value={ this.state.defaultvalue }
                        id={this.state.selid}
                        type="select"
                        name={this.state.selid}
                        onChange={this.onDropdownSelected}>
                      {this.props.sel}
                    </select>

                    <div className="edit_buttons">

                      { ( this.state.defaultvalue === 0 || !this.props.item)
                        ? <span className="form-button-2"
                                onClick={() => { this.inputname() }}>
                            Create a New Artist
                          </span>
                        :null
                      }

                      { ( this.props.item && this.state.defaultvalue !== 0 )
                        ? <span className="form-button-2"
                                onClick={() => { this.inputname() }}>
                            { this.state.edit_title }
                          </span>
                        : null
                      }

                      { (this.state.edit_title === 'Edit Artist' && this.props.item && this.state.defaultvalue !== 0 )
                          ? <span
                              className="form-button-2"
                              onClick={() => { this.removeArtist() }}>
                                  Remove
                            </span>
                          : null
                      }
                    </div>
                  </div>
                : null
              }

              { (this.state.show_field)
                ? <div className="subform-wrapper" id={`form-${this.state.itemid}`}>
                    <div className="form-group">
                      { (this.state.error)
                        ? <div className="error">{this.state.error}</div>
                        : null
                      }

                        <div className="label">First Name:</div>
                        <input
                            type="text"
                            key={this.state.fnameid}
                            id={this.state.fnameid}
                            name="fname"
                            value={this.state.fname}
                            onChange={this.handleChange}  />
                      </div>
                      <div className="form-group">
                        <div className="label">Last Name:</div>
                        <input
                            type="text"
                            key={this.state.lnameid}
                            id={this.state.lnameid}
                            name="lname"
                            value={this.state.lname}
                            onChange={this.handleChange}
                         />
                    </div>
                    <div className="edit_buttons">
                      <div className='form-button-2'
                           value="Submit"
                           onClick={ this.selectname }>
                        Return to Select
                      </div>
                      <div className='form-button-2'
                           value="Submit"
                           onClick={ this.handleSubmit }>
                        Save Artist
                      </div>
                    </div>
                  </div>
                : null
              }
            </div>
    );
  }
}

export default AddArtist;

