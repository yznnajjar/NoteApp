import { useCallback, useMemo, useState } from "react";
import moment from "moment";
//Import Helper
import Card from "./Components/Card";
import { colors } from "./lib/constant";
//Import Style
import "./App.scss";

const App = () => {
  const [noteText, setNoteText] = useState("");
  const [colorSelected, setColorSelected] = useState(colors[0].color);
  const [isEditClicked, setIsEditClicked] = useState("");
  const [cardsInfo, setCardsInfo] = useState([]);
  const [editClickedIndex, setEditClickedIndex] = useState("");

  const handleNoteTextChange = useCallback((value) => {
    setNoteText(value);
  },[noteText]);

  const handleAddNoteClicked = useCallback(() => {
    const prepareData = {
      content: noteText,
      color: colorSelected,
      date: moment(Date.now()).format("DD MMM, h:mm"),
      id : Math.round(Math.random() * 1000)
    };


    setCardsInfo((prevArr) => [...prevArr, { ...prepareData }]);
  }, [noteText, colorSelected ,cardsInfo]);

  const showNoteText = useMemo(() => {
    return (
      <div className="note--text">
        <span className="note--text__label">Note Text</span>
        <input
          className="note--text__input-field"
          type="text"
          onChange={(e) => handleNoteTextChange(e.target.value)}
          value={noteText}
        />
      </div>
    );
  }, [noteText]);

  const showNoteColorSelect = useMemo(() => {
    return (
      <div className="note--color">
        <span className="note--color__label">Note Color</span>
        <select
          className="note--color__select"
          onChange={(e) => setColorSelected(e.target.value)}
        >
          {colors.map((color, index) => (
            <option 
              key={index}
              value={color.color}
            >
              {color.color}
            </option>
          ))}
        </select>
      </div>
    );
  }, []);


  const showAddNoteButton = useMemo(() => {
    return (
      <button className="save--note" onClick={handleAddNoteClicked}>
        ADD NOTE
      </button>
    );
  }, [colorSelected, noteText]);

  const onEditClick = useCallback((id) => {
    setEditClickedIndex(id);
    setIsEditClicked((prev) => !prev);
  },[isEditClicked, editClickedIndex]);

  const onDeleteClick = useCallback((id) => {
   setCardsInfo(prevArr => prevArr.filter(item => item.id !== id));
  },[]);

  const showCards = useMemo(() => {
    return cardsInfo.map((card, index) => {
      return (
        <Card
          id={card.id}
          content={card.content}
          color={card.color}
          title={`Note ${index + 1}`}
          date={card.date}
          key={index}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          editClickedIndex={editClickedIndex}
          handleNoteTextChange={handleNoteTextChange}
          isEditClicked={isEditClicked}
          editClickedIndex={editClickedIndex}
        />
      );
    });
  }, [cardsInfo, isEditClicked]);

  return (
    <div className="app">
      {showNoteText}
      {showNoteColorSelect}
      {showAddNoteButton}
      <div className="all--cards">{showCards}</div>
    </div>
  );
};

export default App;
