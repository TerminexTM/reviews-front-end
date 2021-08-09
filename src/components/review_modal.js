import React from "react"


const Review = (props) => {

  if(!props.viewReviewModal){
    return null
  }

  return(                             //clicking outside area of modal will close it
    <div className="review-modal-box" onClick={props.onClose}>
      <div className="review-modal-content"
      //clicking in this area won't close modal
      onClick={event => event.stopPropagation()}>
        <h2>{props.title}</h2>
        <div className="review-modal-body">
          Yo Yo Yo this is a review.
        </div>
        <div className="review-modal-footer">
          <button onClick={props.onClose} className="buttons">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Review
