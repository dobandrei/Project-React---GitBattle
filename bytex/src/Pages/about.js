import React from 'react';

function About() {
  return (
    <div className='about'>
      <h1>About</h1>
      <article>
        <p>
          GitBattle is a React App that pulls data from the Github API to achieve different actions on Github users.
        </p>
        <p>
          There are multiple types of battles you can do with 2 or more GitHub users.
        </p>
        <ul>
          <li>
            which GitHub user is closer to you ?
          </li>
          <li>
            who has more public repositories ?
          </li>
          <li>
            who has the most followers ?
          </li>
          <li>
            who has the oldest account ?
          </li>
          <li>
            Who updated their account last?
          </li>
        </ul>
      </article>
      
    </div>
  );
}

export default About;