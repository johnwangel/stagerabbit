import React, {Component} from 'react';
import { connect } from 'react-redux';

import {  prodsByShowGroup } from '../Productions/actions';
import SanitizedHTML from 'react-sanitized-html';

import ShowItem from "./show_item";

const moment = require('moment');

class RandH extends Component {
  constructor(props) {
    super(props);
    this.props.prodsByShowGroup(1);
  }

  render() {
    let p = (this.props && this.props.Prods && this.props.Prods.upcoming) ? this.props.Prods.upcoming : null;

    return (
      <div className="aboutus">
        <div className="aboutus_column article">
            <h1>Rodgers and Hammerstein</h1>
            <div className='subttl'>Fathers of the Modern Musical</div>
            <p>Just about everyone knows Rodgers and Hammerstein.
              Starting with their first collaboration, <i>Oklahoma!</i>, in 1943,
              they transformed the musical from a light, trivial entertainment into
              the more substantial works of art that continues to this day.
            </p>
            <p>
              Perhaps the sentimentality of Oscar Hammerstein II feels as corny as Kansas in August
              today, but these stories are still some of our most beloved stage shows. And there are
              few composers as gifted as Richard Rodgers in creating a melody that lingers in the memory
              and the heart. They were unafraid to tackle tough stories, from a lecherous farmhand in Oklahoma
              to an abusive theif in Carousel, from racism in South Pacific to fascism in The Sound of Music.
            </p>
            <p>
              Following is a complete list of Rodgers and Hammerstein&rsquo;s collaborations.
            </p>


            <h2>The Sound of Music</h2>
            <p>The hills are alive! Who doesn&rsquo;t know every word to every song in <i>The Sound of Music</i>.
              Arguably R&H&rsquo; most popular work due to the mega-hit film from 1964, it tells the
              life-affirming story of Maria, a rebellious nun-turned-nanny, who turns the regimented von Trapp
              household upside-down when she brings music into the lives of Captain Georg von Trapp and his
              seven children. Music saves them when their beloved Austria succumbs to the Nazi threat. You know
              all the tunes: 'Do Re Mi', 'My Favorite Things', 'The Sound of Music', 'Climb Every Mountain', The Lonely Goatherd', 'Edelweiss'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='The Sound of Music') ? <ShowItem key={idx} item={idx}/> : null )
                : null
              }
            </div>

            <h2>Oklahoma!</h2>
            <p>
              You know, where the winds coming sweeping down the plains! R&H&rsquo;s first collaboration&mdash;
              groundbreaking in its time for seamlessly combining music, lyrics, dance, and drama.
              It&rsquo;s the simple story of Laurey trying to decide which of two suitors to take her to the
              box social, that becomes sinister when suitor Judd is overcome with jealousy. Timeless songs include the rousing anthem 'Oklahoma!', 'Oh, What a Beautiful Mornin', 'Surrey with a Fringe on Top', and 'People Will Say We&rsquo; in Love'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Oklahoma!') ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>South Pacific</h2>
            <p>
              You&rsquo;re in for some enchanted evening with <i>South Pacific</i>. Somewhat improbably
              based on James A. Michener&rsquo;s sprawling short story collection, <i>Tales of the South Pacific</i>,
              it is the story of a group of U.S. Seabies idling on a South Pacific island during World War II, and the blossoming
              romance between nurse Nellie Forbush and French planter Emile de Becque. Touching on interracial issues of the day,
              it&rsquo;s themes still resonate. Includes the classics 'Some Enchanted Evening',
              'I'm Gonna Wash That Man Right Outa My Hair', 'Younger Than Springtime'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='South Pacific') ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Carousel</h2>
            <p>Their second collaboration, and another HUGE hit, <i>Carousel</i> is Rodgers and Hammerstein&rsquo;s most lust score.
            Based on <i>Liliom</i> by Hungarian playwright Ferenc Molnár, and reset in a New England factory town at the turn of the 19th century, this is a love story between carnival barker Billy Bigelow and millworker Julie Jordan. Despite Billy&rsquo;s
            love for Julie, his criminal past leads him astray. It takes the Greatest Judge of all to decide if he is worthy of
            redemption. Includes 'June is Bustin Out All Over', 'If I Loved You', and the rousing 'You'll Never Walk Alone'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Carousel') ? <ShowItem key={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>The King and I</h2>
            <p>It&rsquo;s East meets West in this tale of Anna Leonowens, and British widow who is hired as a tutor to the children of
            of the King of Siam. Despite their cultural differences, they influence one another profoundly. Based on the semi-fictional account in the novel <i>Anna and the King of Siam</i>, and the film of the same name, this is Rodgers and Hammerstein aty
            their grandest. Packed with familiar songs: 'Getting to Know You', 'Hello Young Lovers', 'We Kiss in a Shadow', 'Shall We
            Dance', 'Something Wonderful'. </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='The King and I') ? <ShowItem key={idx} number={idx}  item={item}/> : null )
                : null
              }
            </div>



            <h2>Cinderella</h2>
            <p>Originally written for television, and starring young Julie Andrews at the height of fame as the star of <i>My Fair Lady</i>. The R&H version of this classic fairy tale was reconceived for the stage in 2013 with a contempory retelling
            that includes the now-classic score: 'Impossible', 'In My Own Little Corner', 'Ten Minutes Ago'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Cinderella') ? <ShowItem key={idx} number={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>State Fair</h2>
            <p>
              Written for Hollywood, <i>State Fair</i> first saw life as a film in 1945, then a television movie in 1962 and again in 1976. It finally made it to Broadway in 1996 in what would be the final production of legendary Producer
              David Merrick. This folksy story follows the Frake family as they attend the Iowa State Fair, finding
              love, and vying for the blue ribbon for mincemeat pie and prize pig. Includes the hits 'It Might as Well Be Spring' and 'A Grand Night for Singing'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='State Fair') ? <ShowItem key={idx} number={idx}  item={item}/> : null )
                : null
              }
            </div>

            <h2>A Grand Night for Singing</h2>
            <p>
              Speaking of A Grand Night for Singing, this revue of R&H songs played Broadway in 1993. It includes all their best-known
              songs, strung together with a minimal book, which adds up to a thrilling night of spectacular music.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='A Grand Night for Singing') ? <ShowItem key={idx} number={idx}  item={item}/> : null )
                : null
              }
            </div>


            <h2>Other Works</h2>

            <p>The following are some of R&H&rsquo;s lesser-known plays. If you find a
            production playing near you, run, don&rsquo;t walk, to catch it!</p>

            <h2>Flower Drum Song</h2>
            <p>
              Based on the 1957 novel <i>The Flower Drum Song</i> by C. Y. Lee, this had a short life on Broadway in 1958, followed
              by a modestly successful film in 1961. It&rsquo; the story of Wang Ta, a Chinese American living in San Francisco&rsquo;s Chinatown, and the generational conflict when his father attempts to arrange a marriage with Mei Li, newly arrived from China. But Wang is smitten with modern woman Linda Low. Includes 'A Hundred Million Miracles', 'You Are Beautiful', 'I Enjoy Being a Girl'.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Flower Drum Song') ? <ShowItem key={idx} number={idx}  item={item}/> : null )
                : null
              }
            </div>

            <h2>Allegro</h2>
            <p>
              An original story by Hammerstein, this is the simple story of Joseph Taylor, Jr., who we see from birth to his young
              adulthood as a big-city doctor, this is a contemplation on the trade-offs between success and happiness. One of Hammerstein&rsquo's great disappointments was that this show was not
              as successful as their other big hits. The one major hit from the show is 'The Gentleman Is a Dope'.
            </p>
            <div>
             { (p)
                ? p.map( (item, idx) => (item.title==='Allegro') ? <ShowItem key={idx} number={idx} item={item}/> : null )
                : null
              }
            </div>


            <h2>Pipe Dream</h2>
            <p>
              Based on a novella by John Steinbeck, <i>Pipe Dream</i> ran for a respectable 246 performances in 1956. Rarely revived,
              the story follows Doc, a respectable Biologist, and Suzie, a down-and-out denizen of Cannery Row, and their
              struggles to adjust to one another&rsquo;s differences.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Pipe Dream') ? <ShowItem key={idx} number={idx} item={item}/> : null )
                : null
              }
            </div>

            <h2>Me and Juliet</h2>
            <p>
              A subject that Rodgers and Hammerstein knew best&mdash;onstage and backstage of a long-running musical,
              aptly called <i>Me and Juliet</i>. Ran over a year on Broadway in 1953&ndash;54, but is little known and rarely
              produced today.
            </p>
            <div>
              { (p)
                ? p.map( (item, idx) => (item.title==='Me and Juliet') ? <ShowItem key={idx} number={idx} item={item}/> : null )
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

RandH = connect(
  mapStateToProps,
  mapDispatchToProps
)(RandH);


export default RandH;