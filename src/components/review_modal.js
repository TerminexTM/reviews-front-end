import React from "react"


const Review = (props) => {

  if(!props.viewReviewModal){
    return null
  }

  return(
    <>
    {  props.viewReviewModal === props.data._id &&
    <div className="review-modal-box" onClick={props.onClose}>
      <div className="review-modal-content"
      onClick={event => event.stopPropagation()}>
        <h2>{props.data.title}</h2>
        <div className="review-modal-body">
          {props.data.review}
        </div>
        <div className="review-modal-footer">
          <button onClick={props.onClose} className="buttons">Close</button>
        </div>
      </div>
    </div>

  }
    </>
)

}

export default Review
