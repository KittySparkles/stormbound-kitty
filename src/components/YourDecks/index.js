import React from 'react'
import Row from '../Row'
import YourDeck from '../YourDeck'
import YourDeckForm from '../YourDeckForm'
import YourDeckGhost from '../YourDeckGhost'
import chunk from '../../helpers/chunk'
import './index.css'

const NewDeck = React.memo(function NewDeck(props) {
  return props.mode === 'INITIAL' || !!props.editedDeckUUID ? (
    <YourDeckGhost onClick={() => props.setMode('FORM')} />
  ) : (
    <YourDeckForm onSubmit={props.addDeck} cancel={props.cancel} />
  )
})

export default React.memo(function YourDecks(props) {
  const rows = chunk(props.decks, 2)

  return (
    <div className='YourDecks'>
      {rows.map((row, index) => (
        <Row desktopOnly key={index}>
          <Row.Column>
            <YourDeck
              {...row[0]}
              onEdit={() => props.onEdit(row[0].uuid)}
              isEdited={row[0].uuid === props.editedDeckUUID}
              handleEdit={props.editDeck}
              cancelEdit={props.disabledEditor}
            />
          </Row.Column>
          <Row.Column>
            {row[1] ? (
              <YourDeck
                {...row[1]}
                onEdit={() => props.onEdit(row[1].uuid)}
                isEdited={row[1].uuid === props.editedDeckUUID}
                handleEdit={props.editDeck}
                cancelEdit={props.disabledEditor}
              />
            ) : (
              <NewDeck
                editedDeckUUID={props.editedDeckUUID}
                mode={props.mode}
                setMode={props.setMode}
                addDeck={props.addDeck}
                cancel={props.disabledEditor}
              />
            )}
          </Row.Column>
        </Row>
      ))}

      {props.decks.length % 2 === 0 && (
        <Row desktopOnly>
          <Row.Column>
            <NewDeck
              editedDeckUUID={props.editedDeckUUID}
              mode={props.mode}
              setMode={props.setMode}
              addDeck={props.addDeck}
              cancel={props.disabledEditor}
            />
          </Row.Column>
          <Row.Column />
        </Row>
      )}
    </div>
  )
})
