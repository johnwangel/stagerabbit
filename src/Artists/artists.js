import React, {Component} from 'react';

import SanitizedHTML from 'react-sanitized-html';

class Artists extends Component {
  render() {
    return (
      <tr key={ this.props.type }>
        <td className="label">{this.props.type} by:</td>
        <td>
          { this.props.artists.map( (item, idx) => {
                  return (
                    <div className="artist-name"
                        key={ `${this.props.type}-${item.artist_id}` }>
                          <SanitizedHTML html={item.fname} /><SanitizedHTML html={item.lname} />{ (this.props.artists.length !== idx+1) ? <SanitizedHTML html=',&nbsp;' />  : ''  }
                    </div>
                  )
              })
          }
          </td>
      </tr>
    )
  }
}
export default Artists;