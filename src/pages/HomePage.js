import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../component/Header';
import HomepageCard from '../component/HomepageCard';
import NavBar from '../component/NavBar';

function HomePage() {
  return (
    <div>
      <Header />
      <NavBar />
      {
        <main className='homepageAllCards'>
          <Link to="/people?page=1"><HomepageCard img={'/images/character.jpg'} name={'Characters'} /></Link>
          <Link to='/planets?page=1'><HomepageCard img={'/images/planets.jpg'} name={'planets'} /></Link>
          <Link to='/films?page=1'><HomepageCard img={'/images/films.jpg'} name={'films'} /></Link>
          <Link to='/species?page=1'><HomepageCard img={'/images/species.jpg'} name={'species'} /></Link>
          <Link to='/vehicles?page=1'><HomepageCard img={'/images/vehicles.jpg'} name={'vehicles'} /></Link>
          <Link to='/starships?page=1'><HomepageCard img={'/images/starships.jpg'} name={'starships'} /></Link>
        </main>
      }
    </div>
  );
}

export default HomePage