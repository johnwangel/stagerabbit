import React, {Component} from 'react';
import { connect } from 'react-redux';
import SanitizedHTML from 'react-sanitized-html';


import { getStates } from '../Main/statesActions';
import { search } from '../Results/actions';

import Results from "../Results/Results";

const curtain = require('../Assets/curtain.jpg');
//const stage = require('../Assets/stage.jpg');

const bg = {
  backgroundImage: `url(${curtain})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundColor: '#1C1316'
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
                  searchType: '1',
                  pages: 0,
                  startPage: 0,
                  search: null,
                  scroll: false,
                  error: null
               };
    this.errorRef = React.createRef();
    this.resultRef = React.createRef();
    this.props.getStates();
    this.city = React.createRef();
    this.theater = React.createRef();
    this.show = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.newlist1 = this.newlist1.bind(this);
    this.newlist2 = this.newlist2.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.SearchResults.results !== prevProps.SearchResults.results && this.props.SearchResults.results.count){
      this.setState({ pages: Math.ceil(this.props.SearchResults.results.count/25), startPage: this.props.SearchResults.results.startAt +1 });
    }
    if (this.props.SearchResults.results !== prevProps.SearchResults.results) {
        this.resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ searchType: e.target.value })
  }

  newlist1(){
    let body = this.state.search;
    body.startAt=this.state.startPage-2;
    this.setState({search:body});
    this.props.search(body);
  }

  newlist2(){
    let body = this.state.search;
    body.startAt=this.state.startPage;
    this.setState({search:body});
    this.props.search(body);
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

    var error='';
    body.startAt=0;
    switch (this.state.searchType){
      case "1":
        if (!body.city) error+='<li>You must provide a city.</li>';
        if (!body.state) error+='<li>You must provide a state.</li>';
        body.type=1;
        body.searchType='ByCity';
        break;
      case "2":
        if (!body.theater) error+='<li>You must provide a theater name.</li>';
        body.type=2;
        body.searchType='ByTheater';
        break;
      case "3":
        if (!body.show) error+='<li>You must provide a show title.</li>';
        body.type=3;
        body.searchType='ByShow';
        break;
    }

    if ( error !== '' ){
      error='<h4>Errors</h4><ol>'+error+'</ol>';
      this.setState({ error });
      this.errorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      return;
    }

    this.setState({ search: body, error: null});
    this.props.search(body);
  }

  render() {
    //console.log('PROPS IN HOME',this.props);
    //console.log(typeof this.props.SearchResults.type, this.props.SearchResults.type)
    //console.log(this.state)

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

            <h2 className="main-page main-column search">Search</h2>

            <div className='searchContent main-column'>
              <form ref={this.errorRef}>
                <div className='form-group'>
                  <div className="search-label">Select Search Type:</div>
                  <select
                    className="form-select wide"
                    id="searchType"
                    type="searchType"
                    name="searchType"
                    value={ this.state.searchType }
                    onChange={ this.handleChange }>
                      <option key='search-1' value='1'>Search by Location</option>
                      <option key='search-2' value='2'>Search by Theater</option>
                      <option key='search-3' value='3'>Search by Show</option>
                  </select>
                </div>
              </form>

              { (this.state.error)
                ? <div className="error" ><SanitizedHTML html={this.state.error}/></div>
                : null
              }

              { ( this.state.searchType === '1')
                ? <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                          <div className="search-label">Find shows within:</div>
                          <select
                              className="form-select wide"
                              type="select"
                              id="distance"
                              name="distance">
                                <option key="1" value="25">25 miles</option>
                                <option key="2" value="50">50 miles</option>
                                <option key="3" value="100">100 miles</option>
                                <option key="4" value="100">200 miles</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <div className="search-label ">of:</div>
                          <input  type="text"
                                  id="city" name="city"
                                  ref={this.city}
                                  placeholder="CITY"/>
                        </div>
                        <div className='form-group'>
                           <select
                                id="state"
                                type="select"
                                name="search_state">
                            {this.props.States.dropdown}
                          </select>
                        </div>
                    <input className='form-button' id='st-1' type="submit" value="Go!" />
                  </form>
                : null
              }

              { ( this.state.searchType === '2')
                ? <form onSubmit={this.handleSubmit}>
                    <input  type="text"
                            id="theater" name="theater"
                            ref={this.theater}
                            placeholder="THEATER NAME"/>
                    <input className='form-button' id='st-2' type="submit" value="Go!" />
                  </form>
                : null
              }

              { ( this.state.searchType === '3')
                ? <form onSubmit={this.handleSubmit}>
                    <input type="text" id="show" name="show" ref={this.show} placeholder="SHOW TITLE"/>
                    <input className='form-button' id='st-3' type="submit" value="Go!"/>
                  </form>
                : null
              }
            </div>

            { ( this.props.SearchResults && this.props.SearchResults.results &&  this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                ? <h2 className="main-page main-column" ref={this.resultRef}>Results</h2>
                : null
            }

            { ( this.props.SearchResults && this.props.SearchResults.results &&  this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )

                ? <div className='searchContent main-column'>
                      { ( this.props.SearchResults && this.props.SearchResults.results && this.props.SearchResults.type === 0 )
                        ? <div className='error'>No results</div>
                        : null
                      }

                      { ( this.props.SearchResults && this.props.SearchResults.type === 1 && this.props.SearchResults.results && this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                          ? <ol start={ (this.startPage > 0 ) ? ((this.state.startPage - 1) * 25) + 1 : 1 }>
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} type='1' item={item} idx={idx} prod={ this.props.SearchResults.results.prods.filter( t => t.length > 0 && t[0].theater_id == item.id ) }/>) }
                            </ol>
                          : null
                      }

                      { ( this.props.SearchResults && this.props.SearchResults.type === 2 && this.props.SearchResults.results &&  this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                          ? <ol>
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} type='2' item={item} idx={idx} />) }
                            </ol>
                          : null
                      }

                      { ( this.props.SearchResults && this.props.SearchResults.results && this.props.SearchResults.type === 3 && this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                          ? <ol>
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} type='3' item={item} idx={idx} />) }
                            </ol>
                          : null
                      }
                  </div>
                : null
            }


        { (this.state.pages !== 0)
            ? <div className='pagination main-column'>
                { (this.state.startPage>1)
                  ? <span className="subbutt prev" onClick={ () => { this.newlist1() } }>Prev</span>
                  : null
                }
                page {this.state.startPage} of {this.state.pages}
                { (this.state.startPage < this.state.pages)
                  ? <span className="subbutt next" onClick={ () => { this.newlist2() } }>Next</span>
                  : null
                }
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
    search : data => {
      dispatch( search(data) )
    }
  }
}

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);