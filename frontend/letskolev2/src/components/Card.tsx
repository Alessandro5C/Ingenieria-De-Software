import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import backFace from '../images/question-mark-card.png';

interface Props {
    name: string,
    number: number,
    frontFace: string
    flipCard: (idx: number, name: string) => boolean,
    onDisabledCards: number[],
    onFlippedCards: number[],
    level: number
}


function Card(props: Props){
  const { name, number, frontFace, onFlippedCards, onDisabledCards, level } = props;
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [hasEvent, setHasEvent] = useState<boolean>(true);
  
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if(props.flipCard(number, name)){
      setIsFlipped(!isFlipped)
      console.log(number)
    }
  }

  useEffect(() => {
    if(onFlippedCards.includes(number)){
      setTimeout(() => setIsFlipped(!isFlipped), 700)
    }
  }, [onFlippedCards]);

  useEffect(() => {
    if(onDisabledCards.includes(number)){
      setHasEvent(false);
    }
  }, [onDisabledCards]);

  return (
    <div style={{ height: level == 1 ? '105px' : '80px', width: '100%'}}>
      <ReactCardFlip isFlipped={isFlipped}>
        <img style={{ height: level == 1 ? '105px' : '80px', width: '100%'}} src={backFace} alt='back-face' onClick={hasEvent ? handleClick : undefined}/> 
        <img style={{ height: level == 1 ? '105px' : '80px', width: '100%'}} src={frontFace} alt='font-face' onClick={hasEvent ? handleClick : undefined}/>
      </ReactCardFlip>
    </div>
  )
}

export default Card;