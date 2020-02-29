import React, {Component} from 'react';
import { ALL_THEATERS } from '../constants/constants.js';
import SanitizedHTML from 'react-sanitized-html';

class Instructions extends Component {
  render() {
   return(
      <div className="aboutus">
        <div className="aboutus_column">
          <h2 className='main-page'>Updating Instructions</h2>

          <p>To ensure that our information is as accurate as possible, we have made
          it easy for theater companies to correct and add details themselves. You can
          edit your company details in four simple steps.</p>
          <p>You can easily get to the editing page for your company:
            <ul>
              <li>Select 'Edit' from the Menu in the top navigation bar</li>
              <li>Or, select the 'Pencil' icon from the top navigation bar (non available on mobile devices)</li>
            </ul>
          </p>


          <h2 className='main-page'>Step 1: Edit Company Details</h2>
          <p>Please ensure that your company details are correct:
            <ul>
              <li>Company/Troupe name is preferred over the name of a theater (which will be provided in venues)</li>
              <li>Provide a physical address if possible, for accurate mapping in the future</li>
              <li>To facilitate discovery, select a Specialty if your company specializes in a certain type of theater (Shakespeare, Children's, LGBT, etc.)</li>
            </ul>
          </p>
          <h3 className='sub-column'>To Edit Company</h3>
          <ol>
            <li>Scroll down to the 'Edit Company Details' section</li>
            <li>Click the pencil icon next to the item that needs to be revised</li>
            <li>Make the edit in the input box</li>
            <li>Click the Check Mark to commit your changes</li>
            <li>To exit without saving, click the circular arrow</li>
          </ol>


          <h2 className='main-page'>Step 2: Add Venues</h2>
          <p>
            <ul>
              <li>All Productions require an associated Venue</li>
              <li>Most companies have a default associated Venue, which is the same as your theater company. You can edit or remove this Venue if incorrect.</li>
              <li>Please provide a full address for the Venue to ensure accurate mapping in the future.</li>
            </ul>
          </p>

          <h3 className='sub-column'>To Edit a Venue</h3>
          <p>Scroll down to the 'Venues' section:
            <ol>
              <li>Click 'Edit' at the right of the Venue you wish to edit</li>
              <li>Make updates to the venue</li>
              <li>Click 'Update Venue' to commit your changes</li>
            </ol>
          </p>

          <h3 className='sub-column'>To Remove a Venue</h3>
          <p>If an incorrect venue is associated, you may remove it:
            <ol>
              <li>Click 'Remove' at the right of the venue you wish to remove</li>
            </ol>
          </p>

          <h3 className='sub-column'>To Associate a Venue</h3>
          <p>Check to see if your venue is already be in our database:
            <ol>
              <li>Click the 'Associate Venue' button from the top toolbar</li>
              <li>Select the Venue from the dropdown list</li>
              <li>Click 'Associate Venue' to commit your changes</li>
              <li>The venue will be added to your venues list</li>
            </ol>
          </p>

          <h3 className='sub-column'>To Create a Venue</h3>
          <p>If the Venue is not in our database, you can add it:
            <ol>
              <li>Click the 'Add Venue' button from the top toolbar</li>
              <li>Input the Venue details</li>
              <li>Click 'Add Venue'</li>
              <li>The Venue will be added to your venues list</li>
            </ol>
          </p>


          <h2 className='main-page'>Step 3: Add Productions</h2>
          <p>Productions are listings for each play in your season.
             Once listed, the next scheduled Production will become visible when your company appears in Search results.
            <ul>
              <li>A Venue is required for all Productions</li>
              <li>A Show is required for all Productions</li>
              <li>Start and End Dates are required</li>
              <li>All other details are optional, but the more details you provide the better your chances of being noticed</li>
            </ul>
          </p>

          <h3 className='sub-column'>To Create a Production</h3>
          <p>
            <ol>
              <li>Click the 'Add Production' button from the top toolbar</li>
              <li>Select the Venue from the dropdown list</li>
              <li>Select your Show from the dropdown list. If your show is not in the list:
                  <ol type='a'>
                    <li>Input the title of your show</li>
                    <li>Select the Genre</li>
                    <li>Click 'Submit Show' to commit the show</li>
                    <li>Your show should now be selected in the dropdown (Note: Creators can be added in Step 4.)</li>
                  </ol>
              </li>
              <li>Select the Start Date.</li>
              <li>Select the End Date (if one performance, select same as Start Date).</li>
              <li>Description (optional): Click the plus button and type or paste in description. The description entered here will be displayed for your production only. (Note: HTML tags are acceptable.)</li>
              <li>Cast (optional): Click the plus sign and type or paste in cast list. (Note: HTML tags are acceptable.)</li>
              <li>Director, Choreographer, Musical Director (all optional):
                  <ol type='a'>
                    <li>Select the name from the dropdown list</li>
                    <li>If name is not in the list, click 'Create a New Artist'</li>
                    <li>Input first and last name (If only one name, last name is required. Include any suffix, eg Jr., III, at end of last name.)</li>
                    <li>Click 'Save Artist'.  New Artist will be selected automatically</li>
                    <li>If more than one artist exists for a category, select 'Another [category]' and follow the instructions above</li>
                  </ol>
              </li>
              <li>Click 'Submit Production' to commit your changes</li>
              <li>The new Production will appear beneath the Productions heading.</li>
            </ol>
          </p>

          <h3 className='sub-column'>To Edit a Production</h3>
          <p>
            <ol>
              <li>At the bottom of the Production card, click the 'Update Production' button</li>
              <li>Make necessary changes (see instructions above for adding a Production)</li>
              <li>Click 'Submit Production' to commit your changes</li>
            </ol>
          </p>

          <h2 className='main-page'>Step 4: Edit Show Details (optional)</h2>
          <p>Show details provide information about the play and its creators.
            <ul>
              <li>Show details are shared across all companies, so they should not include any details specific to your Production.</li>
            </ul>
          </p>

          <h3 className='sub-column'>To Edit a Show</h3>
          <p>If you added a Show for your Production, you can enter the creators here:
            <ol>
              <li>If you need to edit the title, click 'Edit Title' and input any changes.</li>
              <li>Select a different 'Genre' if necessary. Note: The type of creator(s) will changed based on selection of musical or play.</li>
              <li>Playwright, Book, Music, Lyrics (all optional):
                  <ol type='a'>
                    <li>Select the name from the dropdown list</li>
                    <li>If name is not in the list, click 'Create a New Artist'</li>
                    <li>Input first and last name (If only one name, enter the name in Last Name. Include any suffix, eg Jr., III, at end of last name.)</li>
                    <li>Click 'Save Artist'.  New artist will be selected automatically</li>
                    <li>If more than one artist exists for a category, select 'Another [category]' and follow the instructions above</li>
                  </ol>
              </li>
              <li>Click 'Update Show' to commit your changes</li>
            </ol>
          </p>

          <h2 className='main-page'>Feedback</h2>
          <p>We look forward to building this new experience with you.
          We welcome any feedback or suggestions you might have on this process.
          Just drop us a line at <a className="inline" href="mailto:info@stagerabbit.com">info@stagerabbit.com</a></p>

        </div>
      </div>
   );
  }
}

export default Instructions;