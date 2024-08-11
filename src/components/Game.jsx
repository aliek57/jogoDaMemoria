import {useState} from 'react'
import Board from './Board'
import angularImg from '../images/angular.png'
import reactImg from '../images/react.png'
import vueImg from '../images/vue.png'
import bootstrapImg from '../images/bootstrap.png'
import cssImg from '../images/css.png'
import htmlImg from '../images/html.png'
import jsImg from '../images/javascript.png'
import tsImg from '../images/typescript.png'

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]
    }

    return array
}


const generateCards = () => {

    const images = [
        angularImg,
        reactImg,
        vueImg,
        bootstrapImg,
        cssImg,
        htmlImg,
        jsImg,
        tsImg
    ]

    const cards = images.map((image) => ({
        image,
        isFlipped: false
    }))

    const duplicateCards = cards
    .concat([...cards])
    .map((card, index) => (
        {...card, id: index}
    ))

    return shuffleArray(duplicateCards)
}

const Game = () => {
    const [cards, setCards] = useState(generateCards())
    const [flippedCards, setFlippedCards] = useState([])

    const playerChances = 10
    const [chances, setChances] = useState(playerChances)

    const result = cards.filter((card) => card.isFlipped).length
  
    const handleCardClick = (clickedCard) => {
        if(chances == 0) return;

        if(flippedCards.length == 2) return;

        const newCards = cards.map((card) => {
            return card.id == clickedCard.id ? {...card, isFlipped: true} : card;
        })

        setCards(newCards)
        setFlippedCards([...flippedCards, clickedCard])
        
        if(flippedCards.length == 1){
            setTimeout(()=>{
                const [firstCard] = flippedCards

                if(firstCard.image !== clickedCard.image){
                    const resetCards = cards.map((card) => {
                        return card.id == firstCard.id || card.id == clickedCard.id ? 
                        {...card, isFlipped: false} : card
                    })

                    setCards(resetCards)
                    setChances((prev)=> prev-1)
                }

                setFlippedCards([])
            }, 600)
        }
    }

    const resetGame = () => {
        setChances(playerChances)
        setFlippedCards([])
        setCards(generateCards())
    }

    return (
    <div className='game'>
      <Board cards={cards} onCardClick={handleCardClick}/>
      {chances == 0 ? (
        <p>Suas tentativas acabaram.</p>
      ) : result == cards.length ? (
        <h2>Parabéns, você ganhou!</h2>
      ) : (
        <p>Tentativas: {chances}</p>
      )}
      <button className="btn" onClick={resetGame}>Reiniciar o jogo</button>
    </div>
  )
}

export default Game
