
const Card = ({card, onClick}) => {
  return (
    <div 
      className={`card ${card.isFlipped ? "flipped" : ""}`} 
      onClick={()=> onClick(card)}>
      {card.isFlipped ? (<img src={card.image}></img>) : '?'}
    </div>
  )
}

export default Card
