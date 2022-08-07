import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Card from '../../components/Card';
import { animales } from '../../data/ImportAnimales';
import { paises } from '../../data/importPaises';

import ICard from '../../models/ICard';
import './CardGame.css';
import { Box, Button, Grid } from '@mui/material';

interface ICard2 {
  name: string,
  number: number
}

function CardGame() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [firstCard, setFirstCard] = useState<ICard2>();
  const [secondCard, setSecondCard] = useState<ICard2>();
  const [onFlippedCards, setOnFlippedCards] = useState<number[]>([]);
  const [onDisabledCards, setOnDisabledCards] = useState<number[]>([]);
  const [level, setLevel] = useState<number>(1);


  const shuffleArray = (array: ICard[]) => {
    for (let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random()*(i-1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const flipCard = (number: number, name: string): boolean => {
    if(firstCard && firstCard.name === name && firstCard.number === number){
      return false;
    }
    if(!firstCard){
      setFirstCard({number, name});
    }
    else {
      setSecondCard({number, name});
    }
    return true;
  }

  const checkForMatch = () => {
    if(firstCard && secondCard){
      const match = firstCard.name === secondCard.name;
      match ? disableCards() : flipCards();
    }
  }

  const disableCards = () => {
    if(firstCard && secondCard){
      setOnDisabledCards([firstCard.number, secondCard.number])
    }
    resetCards();
  }

  const flipCards = () => {
    if(firstCard && secondCard){
      setOnFlippedCards([firstCard.number, secondCard.number])
    }
    resetCards();
  }

  const resetCards = () => {
    setFirstCard(undefined);
    setSecondCard(undefined);
  }

  useEffect(() => {
    if(level == 1){
      shuffleArray(animales);
      setCards(animales);
    }
    else {
      shuffleArray(paises);
      setCards(paises);
    }
    
  }, [level]);

  useEffect(() => {
    checkForMatch()
  }, [secondCard])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button onClick={() => setLevel(1)}>Nivel 1</Button>
      <Button onClick={() => setLevel(2)}>Nivel 2</Button>
      <Grid container spacing={{ xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12 }} >
        {
          cards.map((card, index) => (
            <Grid item xs={level == 1 ? 2 : 1}>
              <Card name={card.name} 
                number={index} 
                frontFace={card.src}
                flipCard={flipCard}
                onFlippedCards={onFlippedCards}
                onDisabledCards={onDisabledCards}
                level={level}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

export default CardGame;