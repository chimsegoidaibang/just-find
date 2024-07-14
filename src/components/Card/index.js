const Card = ({ card, handleChoice, flipped, disable }) => {
    function handleClick() {
        if (!disable) handleChoice(card)
    }
    const classes = flipped ? 'card-inner flipped' : 'card-inner'
    return (
        <div
            className='card'
            onClick={handleClick}>
            <div className={classes}>
                <div className='font'>
                    <h2 className='text'>{}</h2>
                </div>
                <div className='back'>
                    <h2 className='text'>{card.value}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card
