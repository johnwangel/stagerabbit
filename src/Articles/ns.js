import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  prodsByShowGroup } from '../Productions/actions';
import SanitizedHTML from 'react-sanitized-html';

import ShowItem from "./show_item";

const moment = require('moment');

class NS extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShowGroup(3);
  }

  render() {
    //console.log(this.props);
    let p = (this.props && this.props.Prods && this.props.Prods.upcoming) ? this.props.Prods.upcoming : null;
    return (
      <div className="aboutus">
        <div className="aboutus_column article">
            <h1>Neil Simon</h1>
            <div className='subttl'>The King of Comedy</div>
            <p>
            </p>

        <h2>Plaza Suite</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Plaza Suite")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Rumors</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Rumors")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Odd Couple</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Odd Couple")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Lost in Yonkers</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Lost in Yonkers")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Sunshine Boys</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Sunshine Boys")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Laughter on the 23rd Floor</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Laughter on the 23rd Floor")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>



        <h2>Brighton Beach Memoirs</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Brighton Beach Memoirs")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Biloxi Blues</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dashing Through the Snow")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Broadway Bound</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Broadway Bound")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>



        <h2>Rose&rsquo;s Dilemma</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dilemma")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>45 Seconds from Broadway</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Seconds from Broadway")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Barefoot in the Park</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Barefoot in the Park")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>California Suite</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("California Suite")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>London Suite</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("London Suite")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Chapter Two</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Chapter Two")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Come Blow Your Horn</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Come Blow Your Horn")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Dinner Party</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dinner Party")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Fools</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Fools")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Gingerbread Lady</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Gingerbread Lady")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>God&rsquo;s Favorite</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Favorite")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>The Good Doctor</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Good Doctor")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>Jake&rsquo;s Women</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Jake")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Last of the Red Hot Lovers</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Last of the Red Hot Lovers")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>The Prisoner of Second Avenue</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Prisoner of Second Avenue")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>
        <h2>Proposals</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Proposals")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

        <h2>The Goodbye Girl</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Goodbye Girl")) ? <ShowItem key={idx} item={item}/> : null )
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

NS = connect(
  mapStateToProps,
  mapDispatchToProps
)(NS);

export default NS;