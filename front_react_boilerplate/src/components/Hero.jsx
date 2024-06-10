import React from 'react';
import './Hero.css';
import heroImage from '../assets/FH-Dreamscape.jpeg'; 

const Hero = () => (
  <div className="hero">
    <h1>Bienvenue sur notre site d'annonces immobilières</h1>
    <p>Trouvez votre prochain appartement rapidement et facilement.</p>
    <img src={heroImage} alt="Description de l'image" />
  </div>
);

export default Hero;
