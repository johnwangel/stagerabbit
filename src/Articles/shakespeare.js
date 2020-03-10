import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  prodsByShowGroup } from '../Productions/actions';
import SanitizedHTML from 'react-sanitized-html';

import ShowItem from "./show_item";

const moment = require('moment');

class Shakespeare extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShowGroup(5);
  }

  render() {
    //console.log(this.props);
    let p = (this.props && this.props.Prods && this.props.Prods.upcoming) ? this.props.Prods.upcoming : null;
    return (
      <div className="aboutus">
        <div className="aboutus_column article">
            <h1>William Shakespeare</h1>
            <div className='subttl'>The Bard of Avon</div>
            <p>
            </p>

            <h1>The Comedies</h1>

            <h2>A Midsummer Night&rsquo;s Dream</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Midsummer Night")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>All&rsquo;s Well That Ends Well</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Well That Ends Well")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>As You Like It</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Road Show")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Love&rsquo;s Labour&rsquo;s Lost</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("As You Like It")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Measure for Measure</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Measure for Measure")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Merchant of Venice</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Merchant of Venice")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Merry Wives of Windsor</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Merry Wives of Windsor")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Much Ado About Nothing</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Much Ado About Nothing")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Taming of the Shrew</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Taming of the Shrew")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>The Comedy of Errors</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("The Comedy of Errors")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Twelfth Night</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Twelfth Night")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Two Gentlemen of Verona</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Two Gentlemen of Verona")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Winter&rsquo;s Tale</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Winter")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>


            <h1>The Tragedies</h1>

            <h2>Antony and Cleopatra</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Antony and Cleopatra")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Coriolanus</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Coriolanus")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Cymbeline</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Cymbeline")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Hamlet</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Hamlet")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Julius Ceasar</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Julius Ceasar")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>King John</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("King John")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>King Lear</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("King Lear")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Macbeth</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Macbeth")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Othello</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Othello")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Pericles</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Pericles")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Romeo and Juliet</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Romeo and Juliet")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>The Tempest</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("The Tempest")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Timon of Athens</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Timon of Athens")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Titus Andronicus</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Titus Andronicus")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>
            <h2>Troilus and Cressida</h2>
                <div>
                  { (p)
                    ? p.map( (item, idx) => (item.title.includes("Troilus and Cressida")) ? <ShowItem key={idx} item={item}/> : null )
                    : null
                  }
                </div>

            <h1>The Histories</h1>


              <h2>Henry IV, Part I</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title === "Henry IV, Part I") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry IV, Part II</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title.includes("Henry IV, Part II")) ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry V</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title==="Henry V") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry VI, Part I</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title==="Henry VI, Part I") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry VI, Part II</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title==="Henry VI, Part II") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry VI, Part III</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title === "Henry VI, Part III") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Henry VIII</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title.includes("Henry VIII")) ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Richard II</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title==="Richard II") ? <ShowItem key={idx} item={item}/> : null )
                      : null
                    }
                  </div>
              <h2>Richard III</h2>
                  <div>
                    { (p)
                      ? p.map( (item, idx) => (item.title.includes("Richard III")) ? <ShowItem key={idx} item={item}/> : null )
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

Shakespeare = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shakespeare);

export default Shakespeare;