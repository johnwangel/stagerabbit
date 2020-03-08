import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  prodsByShowGroup } from '../Productions/actions';
import SanitizedHTML from 'react-sanitized-html';

import ShowItem from "./show_item";

const moment = require('moment');

class JHW extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShowGroup(2);
  }

  render() {
    //console.log(this.props);
    let p = (this.props && this.props.Prods && this.props.Prods.upcoming) ? this.props.Prods.upcoming : null;
    return (
      <div className="aboutus">
        <div className="aboutus_column article">
            <h1>Jones Hope Wooten</h1>
            <div className='subttl'>America&rsquo;s Playwrights</div>
            <p>
              The writing trio of Jessie Jones, Nicholas Hope, and Jamie Wooten, affectionately dubbed
              Jones Hope Wooten, are known for their fall-off-your-seat hilarious comedies. All are veteran
              writers for film and television, but they have made a special commitment to support community
              theater. Their shows have been produced more that 6000 times across the United States and
              the world! Their work is celebrated for portrayals of strong, vivid female characters.
              Among the most produced playwrights in the country, they have been called &ldquo;America&rsquo;s Playwrights&rdquo;.
            </p>

            <h2>The Dixie Swim Club</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dixie Swim Club")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Always a Bridesmaid</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Always a Bridesmaid")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Deliver Us From Mama</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Deliver Us From Mama")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Southern Hospitality</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Southern Hospitality")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>The Savannah Sipping Society</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Savannah Sipping Society")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Dearly Beloved</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dearly Beloved")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Funny Little Thing Called Love</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Funny Little Thing Called Love")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Farce of Nature</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Farce of Nature")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Last Round-Up of the Guacamole Queens</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Guacamole Queens")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Doublewide, Texas</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title === "Doublewide, Texas") ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>The Red Velvet Cake War</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Red Velvet Cake")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Mama Won&rsquo;t Fly</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Mama Won")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Rex&rsquo;s Exes</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Exes")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>



            <h2>The Hallelujah Girls</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Hallelujah Girls")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>&rsquo;Til Beth Do Us Part</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Beth Do Us Part")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Christmas Belles</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Christmas Belles")) ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Doublewide, Texas, Christmas</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==="A Doublewide, Texas, Christmas") ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Dashing Through the Snow</h2>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title.includes("Dashing Through the Snow")) ? <ShowItem key={idx} item={item}/> : null )
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

JHW = connect(
  mapStateToProps,
  mapDispatchToProps
)(JHW);

export default JHW;

