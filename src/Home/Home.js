import React, {Component} from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import parseISO from 'date-fns/parseISO'
import SanitizedHTML from 'react-sanitized-html';

import { recentUpdates } from '../Recent/actions';
import { getStates } from '../Main/statesActions';
import { search } from '../Results/actions';
import { getEventTypes } from '../Events/actions';

import Results from "../Results/Results";
import Recent from "../Recent/recent";
import Article from "../Articles/article";

var Moment = require('moment');

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
    this.state={  selectedOption: 'location',
                  searchType: '1',
                  pages: 0,
                  startPage: 0,
                  search: null,
                  scroll: false,
                  error: null,
                  event_start: new Date(),
                  event_end: parseISO(Moment.utc(new Date()).add(7,'days').format('YYYY-MM-DD')),
                  free_only: false,
                  event_type: '0'
               };

    this.props.recentUpdates();
    this.props.getEventTypes(1);

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
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleFreeChange = this.handleFreeChange.bind(this);
    this.onEventTypeChange = this.onEventTypeChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    let scrollme=true;
    if (this.props.SearchResults.results !== prevProps.SearchResults.results && this.props.SearchResults.results.count){
      if (this.props.SearchResults.results.search) {
        this.setState({ search: this.props.SearchResults.results.search });
        scrollme=false;
      }
      this.setState({
        pages: Math.ceil(this.props.SearchResults.results.count/25),
        startPage: this.props.SearchResults.results.startAt +1
      });
    }
    if (this.props.SearchResults.results !== prevProps.SearchResults.results && scrollme) {
        this.resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }
  }

  handleChange(e){
    e.preventDefault();
    this.setState({ searchType: e.target.value });
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

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  changeSelect(opt) {
    this.setState({
      selectedOption: opt
    });
  }

  handleStartDateChange(e) {
    this.setState({ event_start : e, event_end : e });
  }

  handleEndDateChange(e) {
    this.setState({ event_end : e });
  }

  handleFreeChange() {
    this.setState({ free_only : !this.state.free_only });
  }

  onEventTypeChange(e){
    e.preventDefault();
    this.setState({ event_type: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const el=e.target.elements;
    let body={};
    if (this.props && this.props.User && this.props.User.client) body.client=this.props.User.client;
    for (var i = el.length - 1; i >= 0; i--) {
      if (el[i].value && el[i].value !=="0") {
        let id=el[i].id, val=el[i].value;
        body[id]=val;
      }
    }

    var error='';
    body.startAt=0;
    switch (this.state.selectedOption){
      case "location":
        if (!body.city) error+='<li>You must provide a city.</li>';
        if (!body.state) error+='<li>You must provide a state.</li>';
        body.type=1;
        body.searchType='ByCity';
        break;
      case "company":
        if (!body.theater) error+='<li>You must provide a theater name.</li>';
        body.type=2;
        body.searchType='ByTheater';
        break;
      case "show":
        if (!body.show) error+='<li>You must provide a show title.</li>';
        body.type=3;
        body.searchType='ByShow';
        break;
      case "event":
        body.type=4;
        body.searchType='ByEvent';
        body.free_only=this.state.free_only;
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

            <h2 className="main-page main-column search gray">Search</h2>

            <div className='searchContent main-column'>
              <form ref={this.errorRef}>
                    <div className='form-group radio'>

                      <div className="search-label">Select Search Type:</div>

                        <div className="radio-group" onClick={ () => { this.changeSelect('location') } }>
                          <input  type="radio"
                                id="location"
                                name='search_type'
                                checked={ this.state.selectedOption === 'location' }
                                value='location'
                                onChange={this.handleOptionChange} />
                          <span className="custom-radio"></span>
                          <label className="radio-label">Location</label>
                        </div>

                        <div className="radio-group" onClick={ () => { this.changeSelect('company') } }>
                          <input  type="radio"
                                id="company"
                                name="search_type"
                                value='company'
                                checked= { this.state.selectedOption === 'company' }
                                onChange={this.handleOptionChange} />
                          <span className="custom-radio"></span>
                          <label className="radio-label">Theater Company</label>
                        </div>

                        <div className="radio-group" onClick={ () => { this.changeSelect('show') } }>
                          <input type="radio"
                              id="show"
                              name="search_type"
                              value='show'
                              checked= { this.state.selectedOption === 'show' }
                              onChange={this.handleOptionChange} />
                          <span className="custom-radio"></span>
                          <label className="radio-label">Show</label>
                        </div>

                        <div className="radio-group" onClick={ () => { this.changeSelect('event') } }>
                          <input type="radio"
                              id="event"
                              name="search_type"
                              value='event'
                              checked= { this.state.selectedOption === 'event' }
                              onChange={this.handleOptionChange} />
                          <span className="custom-radio"></span>
                          <label className="radio-label">Online Events</label>
                        </div>

                      </div>
              </form>

              { (this.state.error)
                ? <div className="error" ><SanitizedHTML html={this.state.error}/></div>
                : null
              }

              { ( this.state.selectedOption === 'location')
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
                                <option key="4" value="200">200 miles</option>
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

              { ( this.state.selectedOption === 'company')
                ? <form onSubmit={this.handleSubmit}>
                    <div className="search-label">Search Theater Companies:</div>
                    <input  type="text"
                            id="theater"
                            name="theater"
                            ref={this.theater}
                            placeholder="THEATER COMPANY NAME"/>
                    <input className='form-button' id='st-2' type="submit" value="Go!" />
                  </form>
                : null
              }

              { ( this.state.selectedOption === 'show')
                ? <form onSubmit={this.handleSubmit}>
                    <div className="search-label">Search Shows:</div>
                    <input type="text" id="show" name="show" ref={this.show} placeholder="SHOW TITLE"/>
                    <input className='form-button' id='st-3' type="submit" value="Go!"/>
                  </form>
                : null
              }

              { ( this.state.selectedOption === 'event')
                ? <form onSubmit={this.handleSubmit}>
                    <div className="search-label">Search Onine Events:</div>

                    <div className='form-group date_search'>
                      <div className="label">Starts by:</div>
                      <DatePicker
                        id="start_date_1"
                        name="start_date"
                        selected={this.state.event_start}
                        onChange={this.handleStartDateChange}
                      />
                    </div>

                    <div className='form-group date_search'>
                      <div className="label">Ends by:</div>
                      <DatePicker
                        id="end_date_1"
                        name="end_date"
                        selected={this.state.event_end}
                        onChange={this.handleEndDateChange}
                      />
                    </div>

                    <div className='form-group radio' onClick={ this.handleFreeChange }>
                      <div className="radio-group">
                        <input type="radio"
                              id="free-1"
                              name="free"
                              value='free'
                              checked={ this.state.free_only }
                            />
                        <span className="custom-radio"></span>
                        <label className="radio-label">Free Events Only</label>
                      </div>
                    </div>

                    <div className='form-group event_search'>
                      <div className="label">Event Type:</div>
                      <select
                            className="form-select"
                            id="eventtype_1"
                            key="eventtype_1"
                            type="select"
                            name="event_type"
                            value={this.state.event_type}
                            onChange={this.onEventTypeChange}
                          >
                          {this.props.Events.types}
                      </select>
                    </div>

                    <input className='form-button' id='st-4' type="submit" value="Go!"/>
                  </form>
                : null
              }

            </div>

            <div ref={this.resultRef}></div>

            { ( this.props.SearchResults && this.props.SearchResults.results && this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                ? <h2 className="main-page main-column">Results</h2>
                : null
            }

            { ( this.props.SearchResults &&
                this.props.SearchResults.results &&
                this.props.SearchResults.results.theaters &&
                this.props.SearchResults.results.theaters.length )

                ? <div className='searchContent main-column'>
                    { ( this.props.SearchResults &&
                        this.props.SearchResults.type === 1 &&
                        this.props.SearchResults.results &&
                        this.props.SearchResults.results.theaters &&
                        this.props.SearchResults.results.theaters.length )
                          ? <div className="searchResults">
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} number={ (this.state.startPage>0) ? (((this.state.startPage-1)*25)+(idx+1)) : (idx+1) } type='1' item={item} idx={idx} prod={ this.props.SearchResults.results.prods.filter( t => t.length > 0 && t[0].theater_id == item.id ) }/> )}
                            </div>
                          : null
                      }

                      { ( this.props.SearchResults &&
                          this.props.SearchResults.type === 2 &&
                          this.props.SearchResults.results &&
                          this.props.SearchResults.results.theaters &&
                          this.props.SearchResults.results.theaters.length )
                          ? <div className="searchResults">
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} number={idx+1} type='2' item={item} idx={idx} />) }
                            </div>
                          : null
                      }

                      { ( this.props.SearchResults && this.props.SearchResults.results && this.props.SearchResults.type === 3 && this.props.SearchResults.results.theaters && this.props.SearchResults.results.theaters.length )
                          ? <div className="searchResults">
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} number={idx+1} type='3' item={item} idx={idx} />) }
                            </div>
                          : null
                      }


                      { ( this.props.SearchResults &&
                          this.props.SearchResults.type === 4 &&
                          this.props.SearchResults.results &&
                          this.props.SearchResults.results.theaters &&
                          this.props.SearchResults.results.theaters.length )
                          ? <div className="searchResults">
                              { this.props.SearchResults.results.theaters.map( (item, idx) => <Results key={`search-${idx}`} number={idx+1} type='4' item={item} idx={idx} />) }
                            </div>
                          : null
                      }



                  </div>
                : <div className='searchContent main-column'>
                      { ( this.props.SearchResults &&
                          this.props.SearchResults.results &&
                          this.props.SearchResults.type === 0 )
                        ? <div className='noresults'>No results</div>
                        : null
                      }
                    </div>
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


          <h2 className="main-page main-column">Suggestions</h2>
          <div className='searchContent main-column'>
            <Article key='1' number='1' title='Rodgers &amp; Hammerstein' id='randh' />
            <Article key='2' number='2' title='Jones Hope Wooten' id='jhw' />
            <Article key='3' number='3' title='Neil Simon' id='ns' />
            <Article key='4' number='3' title='Sondheim' id='sondheim' />
            <Article key='5' number='5' title='Shakespeare' id='shakespeare' />
          </div>

          <h2 className="main-page main-column">Recent Additions</h2>
          <div className='searchContent main-column'>
            { ( this.props.Recents && this.props.Recents.length)
              ? this.props.Recents.map( (item, idx) => <Recent key={idx} number={idx+1} item={item} />)
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
    },
    recentUpdates : () => {
      dispatch( recentUpdates() )
    },
    getEventTypes: (data) => {
      dispatch( getEventTypes(data) )
    }
  }
}

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);