import React, {Component} from 'react';
import { ALL_THEATERS } from '../constants/constants.js';
import SanitizedHTML from 'react-sanitized-html';

class Instructions extends Component {
  render() {
   return(
      <div className="aboutus">
        <div className="aboutus_column">
          <h1>Updating Instructions</h1>

          <p>To ensure that our information is as accurate as possible, we have made
          it easy for theater companies to correct and add details themselves. You can
          edit your company details in four simple steps.</p>


          <h1>Step 1: Edit Company Details</h1>
          <p>Please ensure that our information is correct:
            <ul>
              <li>Company/Troupe name is preferred over the name of a theater (which will be provided in venues)</li>
              <li>Provide a physical address if possible, for accurate mapping in the future </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </p>

          To edit: Click the pencil icon next to the item that needs to be revised.
          Make the edit in the input box.
          Click the


          <h1>Step 2: Add Venues</h1>
          <p>Text:
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </p>

          <h1>Step 3: Add Productions</h1>
          <p>Text:
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </p>

          <h1>Step 4: Edit Show Details</h1>
          <p>Text:
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </p>

          <p>We look forward to building this new experience with you. And we welcome any feedback or suggestions you might have.
          Just drop us a line at <a className="inline" href="mailto:info@stagerabbit.com">info@stagerabbit.com</a></p>

        </div>
      </div>
   );
  }
}

export default Instructions;