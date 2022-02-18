import React,{useMemo} from "react";
import classnames from 'classnames';
//Import Img
import DeleteIcon from '../../assest/img/delete.png'
import EditIcon from '../../assest/img/edit.png'
//Import Style
import './Card.scss';
import { AQUA_COLOR, BLUE_COLOR, GREEN_COLOR, ORANGE_COLOR, PURPLE_COLOR, RED_COLOR } from "../../lib/constant";
import { useCallback } from "react";

const Card = (props) =>{
  console.log({props},"CARD");

  const showCardTitle = useMemo(()=>{
    return (
      <div className="card--header">
        <span className="card--header__title">{props.title}</span>
        <div>
          <img 
            src={EditIcon}
            className="edit-icon"
            onClick={()=>props.onEditClick(props.index)}
          />
          <img
            src={DeleteIcon}
            className="delete-icon"
            onClick={()=>props.onDeleteClick(props.index)}
          />
        </div>
      </div>
    )
  },[props.index]);

  const showCardContent = useMemo(()=>{
    if(props.index === props.editClickedIndex && props.isEditClicked){
      return (
        <textarea
          className="card--editiable"
          style={{border:"1px solid red",marginInline:"15px", height:"30%",width:"92%"}}
          value={props.content}
          onChange={e=>props.handleNoteTextChange(e.target.value)}
        />
      )
    }else {
      return (
        <div className="card--content">
          <span>{props.content}</span>
        </div>
      )
    }
    
  },[props.content, props.isEditClicked, props.index]);

  const showCardFooter = useMemo(()=>{
    return (
      <div className="card--footer">
        <span>{props.date}</span>
      </div>
    )
  },[props.date]);


 

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