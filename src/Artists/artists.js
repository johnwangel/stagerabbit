import React, {Component} from 'react';

class Artists extends Component {

  render() {
    return (
      <div>
      { (this.props.artists)
          ? <div key={ this.props.type }>
                <span className="runin">{this.props.type} by:</span>
                { this.props.artists.map( (item, idx) => {
                        return (
                          <span
                              key={ `${this.props.type}-${item.artist_id}` }>
                                  {item.fname} {item.lname}{ (this.props.artists.length !== idx+1) ? ', '  : ''  }
                          </span>
                        )
                    })
                }
                    </div>
          : null
        }
      </div>
    )

  }

}

export default Artists;