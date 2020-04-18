import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  prodsByShowGroup } from '../Productions/actions';
import SanitizedHTML from 'react-sanitized-html';

import ShowItem from "./show_item";

const moment = require('moment');

class Sondheim extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShowGroup(4);
  }

  render() {
    //console.log(this.props);
    let p = (this.props && this.props.Prods && this.props.Prods.upcoming) ? this.props.Prods.upcoming : null;
    return (
      <div className="aboutus">
        <div className="aboutus_column article">
            <h1>Stephen Sondheim</h1>
            <div className='subttl'>The Wizard of Words</div>
            <p>
            </p>

        <h2>Into the Woods</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Into the Woods")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Company</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Company")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Follies</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Follies")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>A Funny Thing Happened on the Way to the Forum</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("A Funny Thing Happened on the Way to the Forum")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>A Little Night Music</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("A Little Night Music")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Sweeney Todd: The Demon Barber of Fleet Street</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Sweeney Todd")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Assassins</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Assassins")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Passion</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Passion")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Sunday in the Park with George</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Sunday in the Park with George")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Gypsy</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Gypsy")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>West Side Story</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("West Side Story")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Side by Side by Sondheim</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Side by Side by Sondheim")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Sondheim on Sondheim</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Sondheim on Sondheim")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Marry Me a Little</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Marry Me a Little")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Putting It Together</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Putting It Together")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Anyone Can Whistle</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Anyone Can Whistle")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Pacific Overtures</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Pacific Overtures")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Saturday Night</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Saturday Night")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Merrily We Roll Along</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Merrily We Roll Along")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Do I Hear a Waltz?</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Do I Hear a Waltz?")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Frogs</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("The Frogs")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Road Show</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Road Show")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = dispatch => {
  return {
    prodsByShowGroup : id => {
      dispatch( prodsByShowGroup( id ) )
    }
  }
}

Sondheim = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sondheim);

export default Sondheim;