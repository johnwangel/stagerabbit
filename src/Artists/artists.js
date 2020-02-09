import React, {Component} from 'react';

class Artists extends Component {

  render() {
    return (
      <tr key={ this.props.type }>
        <td className="label">{this.props.type} by:</td>
        <td>
          { this.props.artists.map( (item, idx) => {
                  return (
                    <span
                        key={ `${this.props.type}-${item.artist_id}` }>
                            {item.fname} {item.lname}{ (this.props.artists.length !== idx+1) ? ', '  : ''  }
                    </span>
                  )
              })
          }
          </td>
      </tr>
    )

  }

}

export default Artists;