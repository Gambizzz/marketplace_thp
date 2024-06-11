import React from 'react';
import heroImage from '../assets/images/hero.avif';

const Hero = () => {
  return (
    <div className='hero'>
      <img src={heroImage} alt='Hero' className='hero-image' />
      <div className='hero-text'>
        <h1 className='text-hero'> Bienvenue sur <strong className='domus'> Domus </strong> ! </h1>
        <p className='text-hero'> Le logement parfait vous attends </p>
      </div>
    </div>
  );
};

export default Hero;