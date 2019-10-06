import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getStates } from '../Main/statesActions';
import { theater_search } from '../TheaterResults/actions';

import TheaterResults from "../TheaterResults/TheaterResults";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.getStates();
    this.city = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const el=e.target.elements;
    let body={};

    for (var i = el.length - 1; i >= 0; i--) {
      if (el[i].value && el[i].value !=="0") {
        let id=el[i].id, val=el[i].value;
        body[id]=val;
      }
    }
    this.props.theater_search(body);

  }

  render() {
    console.log('PROPS IN HOME',this.props)

      return (<div className="body">
          <div className="main">
            <p>
              StageRabbit was designed to help you find live theatrical productions near you.
              Whether you&rsquo;re traveling to someplace new,
              or you just want to find something on stage in your area,
              just select your criteria below and search.
            </p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <span className='runin'>Find shows within:</span>
            <select
                  type="select"
                  id="distance"
                  name="distance">
                    <option key="1" value="25">25 miles</option>
                    <option key="2" value="50">50 miles</option>
                    <option key="3" value="100">100 miles</option>
                    <option key="4" value="100">200 miles</option>
           </select>
            <span className="runin">of</span>
            <input type="text" id="city" name="city" ref={this.city} placeholder="city"/>

            <select
                  id="state"
                  type="select"
                  name="search_state">
              {this.props.States.dropdown}
            </select>
            <div><input type="submit" value="Go!" className="subbutt" /></div>
          </form>
          { ( this.props.SearchTheaters && this.props.SearchTheaters.length ) ?
              <div className="results"><div className="head1">Results:</div>
               <ol>
                { ( this.props.SearchTheaters && this.props.SearchTheaters.length ) ?
                  this.props.SearchTheaters.map( (item, idx) => <TheaterResults key={`search-${idx}`} thtr={item} idx={idx} />)
                  : null
                }
               </ol>
              </div>
              : null
          }
      </div>)
  }
}

const mapStateToProps = state => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    getStates : () => {
      dispatch( getStates() )
    },
    theater_search : data => {
      dispatch( theater_search(data) )
    }
  }
}

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);