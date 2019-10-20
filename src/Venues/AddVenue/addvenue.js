import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddVenue extends Component {
  constructor(props) {
    super(props);
    let v=this.props.show_what.venue;
    this.state = {
      name: (v) ? v.venue_name :'',
      add1: (v) ? v.venue_add1 :'',
      add2: (v) ? v.venue_add2 :'',
      city: (v) ? v.venue_city :'',
      zip: (v) ? v.venue_zip :'',
      phone: (v) ? v.venue_phone :'',
      dir: (v) ? v.venue_dir :'',
      venues_associate: 0,
      venue_state: 0,
      window: null,
      scroll: null,
      type: ''
     }

    this.handleVenueSubmit = this.handleVenueSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
  }

  componentDidMount() {
    var body = document.body,
    html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    this.setState({ scroll: window.scrollY, window: height });

    if (this.props.hide_add_venue_form) this.setState({ type : 'add' });
    if (this.props.hide_edit_venue_form) this.setState({ type : 'edit' });
    if (this.props.hide_assoc_venue_form) this.setState({ type : 'associate' });
  }

  handleVenueSubmit(e) {
    e.preventDefault();
    const el = e.target.elements;
    let body={ venue_type: null, vid: null  };

    for (var i = el.length - 1; i >= 0; i--) {
      if (el[i].value === 'Associate Venue') {
        body.venue_type=1;
      } else if (el[i].value ===  'Edit Venue') {
        body.venue_type=2;
        body.vid=parseInt(el[i].id);
      } else if (el[i].value === 'Add Venue') {
        body.venue_type=3;
      } else if (el[i].value && el[i].value !=="0") {
        let id=el[i].id, val=el[i].value;
        body[id]=val;
      }
    }
    if (body.vid) body.vid=parseInt(body.vid);
    this.props.update(body)
  }

  handleChange(e) {
    const n = e.target.name;
    this.setState({ [n] : e.target.value});
  }

  onDropdownSelected(e){
    this.setState( { [e.target.name] : e.target.value } );
  }

  render() {
    const title = ( !this.props.show_what.hide_edit_venue_form ) ? 'Edit Venue' : 'Add Venue';
    return (
      <div className='overlay' style={{height: this.state.window + 'px'}}>
        <div className="add_venue" style={{marginTop: this.state.scroll + 'px'}}>
          <div class="close" onClick={() => { this.props.venue_form( this.state.type ) } } >&times;</div>
          <h2>Update Venues</h2>
          { (!this.props.show_what.hide_assoc_venue_form && this.props.VenuesByTheater.all)
            ?         <form onSubmit={this.handleVenueSubmit}>
                         <span className="runin">Associate an Existing Venue:</span>
                         <select
                                type="select"
                                id="vid"
                                name="venues_associate"
                                value={ this.state.venues_associate }
                                onChange={this.onDropdownSelected}>
                           {this.props.VenuesByTheater.all}
                         </select>
                         <input className='subbutt' id='0' type="submit" value="Associate Venue" />
                      </form>
              : null
            }

          { (!this.props.show_what.hide_add_venue_form || !this.props.show_what.hide_edit_venue_form)
            ? <form onSubmit={this.handleVenueSubmit}>
                <div><span className="runin">Name:</span>
                <input  id="venue_name_1"
                        key="venue_name-1"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </div>

                <div><span className="runin">Address 1:</span> <input  id={this.props.theater_id+'-add1'}
                        id="venue_add1_1"
                        key="venue_add1-1"
                        type="text"
                        name="add1"
                        value={this.state.add1}
                        onChange={this.handleChange} />
                </div>

                <div><span className="runin">Address 2:</span> <input id={this.props.theater_id+'-add2'}
                        id="venue_add2_1"
                        key="venue_add2-1"
                        type="text"
                        name="add2"
                        value={this.state.add2}
                        onChange={this.handleChange} />
                </div>

                <div><span className="runin">City:</span>
                      <input
                        id="venue_city_1"
                        key="venue_city-1"
                        type="text"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange} />

                <span className="runin">State:</span>
                  <select
                        id="venue_state"
                        type="select"
                        name="venue_state"
                        value={ this.state.venue_state }
                        onChange={this.onDropdownSelected}>
                    {this.props.states}
                  </select>
                </div>

                <div><span className="runin">Zip:</span>
                    <input
                        id="venue_zip_1"
                        key="venue_zip-1"
                        type="text"
                        name="zip"
                        value={this.state.zip}
                        onChange={this.handleChange} />
                </div>

                <div><span className="runin">Phone:</span>
                    <input
                        id="venue_phone_1"
                        key="venue_phone-1"
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange} />
                </div>

                <div><span className="runin">Directions:</span><br />
                    <textarea
                        id="venue_directions_1"
                        key="venue_directions-1"
                        type="text"
                        name="dir"
                        value={this.state.dir}
                        onChange={this.handleChange} />
                </div>
                <input className='subbutt' id={ this.props.show_what.venue.venue_id } type="submit" value={title} />
              </form>
              : null
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

AddVenue = connect(
  mapStateToProps
)(AddVenue);

export default AddVenue;