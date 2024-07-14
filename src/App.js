import './App.scss'
import { words } from './ultis'

import Card from './components/Card'
import { useEffect, useState } from 'react'
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disable, setDisable] = useState(false)

    function shuffleCards() {
        const shuffledCards = [...words, ...words]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }
    // handle a choice
    function handleChoice(card) {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisable(true)
            if (choiceOne.value === choiceTwo.value) {
                const newData = cards.map(card => {
                    if (card.value === choiceOne.value)
                        return { ...card, matched: true }
                    return card
                })
                setCards(newData)
                resetTurn()
            } else {
                console.log('there two card no matched')

                setTimeout(() => resetTurn(), 500)
                // resetTurn()
            }
        }
    }, [choiceOne, choiceTwo])

    // reset choice and increase turn
    function resetTurn() {
        setDisable(false)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prev => prev + 1)
    }

    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className='App'>
            <button
                className='btn new-game'
                onClick={shuffleCards}>
                New Game
            </button>
            <div className='card-grid'>
                {cards &&
                    cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={
                                card === choiceOne ||
                                card === choiceTwo ||
                                card.matched
                            }
                            disable={disable || card === choiceOne}
                        />
                    ))}
            </div>
            <p className='turn-number'>{turns && turns + ' turn'} </p>
        </div>
    )
}

export default App
