import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getStates } from '../Main/statesActions';
import { search } from '../Results/actions';

import Results from "../Results/Results";

const curtain = require('../Assets/curtain.jpg');
const stage = require('../Assets/stage.jpg');

const bg = {
  backgroundImage: `url(${curtain})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundColor: '#1C1316'
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={ searchType: '1' }
    this.props.getStates();
    this.city = React.createRef();
    this.theater = React.createRef();
    this.show = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ searchType: e.target.value })
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

    switch (this.state.searchType){
      case "1":
        body.type=1;
        body.searchType='ByCity';
        break;
      case "2":
        body.type=2;
        body.searchType='ByTheater';
        break;
      case "3":
        body.type=3;
        body.searchType='ByShow';
        break;
    }
    this.props.search(body);
  }

  render() {
    console.log('GETTING THIS');
    console.log('PROPS IN HOME',this.props)

      return (<div className="body">
          <div className="main" style={bg}>
            <div className='intro'>
              <div className='content'>
                <p>StageRabbit was created especially for <span className='accent'>Theater Lovers</span> to help you discover live theater nearby.</p>
                <ul>
                  <li>Looking for a production of your favorite show?</li>
                  <li>Want to find new theater companies?</li>
                  <li>Looking for theater options while you&rsquo;re traveling?</li>
                  <li>Or do you just have the theater bug and want to find shows playing near you right now?</li>
                </ul>
                <p>It&rsquo;s easy&mdash;and free. Just use the search fields below to get started!</p>
              </div>
            </div>
          </div>
          <div className='searchContent'>
              <span className='runin'>Select Search Type:</span> <select
                id="searchType"
                type="searchType"
                name="searchType"
                value={ this.state.searchType }
                onChange={ this.handleChange }>
                  <option key='search-1' value='1'>Search by Location</option>
                  <option key='search-2' value='2'>Search by Theater</option>
                  <option key='search-3' value='3'>Search by Show</option>
              </select>

              { ( this.state.searchType === '1')
                ? <form onSubmit={this.handleSubmit}>
                    <div className='single'>
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
                    </div>
                    <div className='go'><input id='st-1' type="submit" value="Go!" className="subbutt" /></div>
                  </form>
                : null
              }

              { ( this.state.searchType === '2')
                ? <form onSubmit={this.handleSubmit}>
                    <input type="text" id="theater" name="theater" ref={this.theater} placeholder="Theater Name"/>
                    <div className='go'><input id='st-2' type="submit" value="Go!" className="subbutt" /></div>
                  </form>
                : null
              }

              { ( this.state.searchType === '3')
                ? <form onSubmit={this.handleSubmit}>
                    <input type="text" id="show" name="show" ref={this.show} placeholder="Show Title"/>
                    <div className='go'><input id='st-3' type="submit" value="Go!" className="subbutt" /></div>
                  </form>
                : null
              }

              { ( this.props.SearchResults && this.props.SearchResults.type === 0 )
                ? <div className='error'>No results</div>
                : null
              }

              { ( this.props.SearchResults && this.props.SearchResults.type === 1 && this.props.SearchResults.results.length ) ?
                  <div className="results"><div className="head1">Results:</div>
                   <ol>
                    { this.props.SearchResults.results.map( (item, idx) => <Results key={`search-${idx}`} type='1' item={item} idx={idx} />) }
                   </ol>
                  </div>
                  : null
              }

              { ( this.props.SearchResults && this.props.SearchResults.type === 2 && this.props.SearchResults.results.length ) ?
                  <div className="results"><div className="head1">Results:</div>
                   <ol>
                    { this.props.SearchResults.results.map( (item, idx) => <Results key={`search-${idx}`} type='2' item={item} idx={idx} />) }
                   </ol>
                  </div>
                  : null
              }

              { ( this.props.SearchResults && this.props.SearchResults.type === 3 && this.props.SearchResults.results.length ) ?
                  <div className="results"><div className="head1">Results:</div>
                   <ol>
                    { this.props.SearchResults.results.map( (item, idx) => <Results key={`search-${idx}`} type='3' item={item} idx={idx} />) }
                   </ol>
                  </div>
                  : null
              }
        </div>
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
    search : data => {
      dispatch( search(data) )
    }
  }
}

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);