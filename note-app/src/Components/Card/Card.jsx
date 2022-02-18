import React,{useMemo} from "react";
import classnames from 'classnames';
//Import Helpers
import { AQUA_COLOR, BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR, PURPLE_COLOR, RED_COLOR } from "../../lib/constant";
//Import Img
import DeleteIcon from '../../assest/img/delete.png'
import EditIcon from '../../assest/img/edit.png'
//Import Style
import './Card.scss';

const Card = (props) =>{

  const showCardTitle = useMemo(()=>{
    return (
      <div className="card--header">
        <span className="card--header__title">{props.title}</span>
        <div>
          <img 
            src={EditIcon}
            className="edit-icon"
            onClick={()=>props.onEditClick(props.id)}
          />
          <img
            src={DeleteIcon}
            className="delete-icon"
            onClick={()=>props.onDeleteClick(props.id)}
          />
        </div>
      </div>
    )
  },[props.content, props.id]);

  const showCardContent = useMemo(()=>{
    if(props.id === props.editClickedIndex && props.isEditClicked){
      return (
        <textarea
          className="card--editiable"
          onChange={e=>props.handleNoteTextChange(e.target.value)}
        >
          {props.content}
          </textarea>
      )
    }else {
      return (
        <div className="card--content">
          <span>{props.content}</span>
        </div>
      )
    }

    
  },[props.id, props.isEditClicked, props.id]);

  const showCardFooter = useMemo(()=>{
    return (
      <div className="card--footer">
        <span>{props.date}</span>
      </div>
    )
  },[props.content]);
 

  return (
    <div className={
      classnames("card--container",{
        "card--container__red"    : props.color === RED_COLOR,
        "card--container__blue"   : props.color === BLUE_COLOR, 
        "card--container__aqua"   : props.color === AQUA_COLOR,
        "card--container__green"  : props.color === GREEN_COLOR,
        "card--container__orange" : props.color === ORANGE_COLOR,
        "card--container__purple" : props.color === PURPLE_COLOR
      })}
    >
      {showCardTitle}
      {showCardContent}
      {showCardFooter}
    </div>
  )
}
export default Card;