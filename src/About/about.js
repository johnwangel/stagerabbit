import React, {Component} from 'react';
import { ALL_THEATERS } from '../constants/constants.js';
import SanitizedHTML from 'react-sanitized-html';

class AboutUs extends Component {
  render() {
   return(
      <div className="aboutus">
        <div className="aboutus_column">
          <h1>About Us</h1>

          <p>StageRabbit was created out of desire to make theater easier to find.</p>

          <p>When travelling to large cities, theater options are everywhere. Advertisements are plastered across websites,
           astride cabs and buses, on billboards along highways and train platforms,
           and in flashy colored lights in theater districts.</p>

          <p>But what about smaller communities?</p>

          <p>Our creators are theater lovers! We have found when traveling across the U.S. that
          it takes a great amount of research to determine what theater options are available.
          Web searches usually turn up movie theaters, and it requires a great deal of scrolling, sorting,
          and scouring search results to discern what live theater is playing during the dates of our trip.</p>

          <p>That's when we had the idea to create a database of theater, and to make it FREE
          and EASY for theater companies to include their listings in our database. With thousands of theaters across the country,
          constantly developing new productions. With fluctuating dates, cast, creative teams, venues, the key is to put updates in the hands of
          the companies themselves. Then discovery of
          great new theaters and productions can be available at the theater-lover's fingertips!</p>

          <h1>Our Vision</h1>
          <p>At StageRabbit we not only have the theatergoer in mind, but also all the various types of
          theaters across the country:
            <ul>
              <li>sit-down productions</li>
              <li>larger touring houses</li>
              <li>professional regional companies</li>
              <li>non-professional community theaters</li>
              <li>children's theater companies</li>
              <li>university theater programs</li>
              <li>high schools and church productions</li>
            </ul>
          </p>

          <p>There is talent to be found everywhere. And with so many theaters trying to stretch small budgets
          to bring art to their community, everyone should have an equal opportunity to be discovered and seen.</p>

          <p>We would like StageRabbit to be an online community where theatergoers can check in on their favorite
          theater companies, and discover new ones. And where theater companies can connect with the theater lovers from all over.</p>          <p>It will provide users the chance to find new productions of their favorite shows or favorite authors.
          Or to discover new works by local writers, or up-and-coming new voices.</p>

          <p>Just expand your search radius to expand your horizons. You may find exciting new theaters nearby that you were never aware of.</p>

          <p>We look forward to building this new experience with you. And we welcome any feedback or suggestions you might have.
          Just drop us a line at <a className="inline" href="mailto:info@stagerabbit.com">info@stagerabbit.com</a></p>

          <div className='mytheaters'><SanitizedHTML html={ ALL_THEATERS } /></div>
        </div>
      </div>
   );
  }
}

export default AboutUs;