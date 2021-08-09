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
        <div className="review-modal-title">
          <h2>{props.data.title}</h2><br/>
        </div>
        <img className="review-modal-image" src={props.data.image} /><br/>
        <div className="review-modal-body">
          <h4 className="review-modal-info">Reviewed by: {props.data.reviewPerson}</h4><br/>
          <p className="review-modal-review">{props.data.review}</p><br/>
            <h4 className="review-modal-info">
            Review Score: {props.data.rating} out of 5</h4>
            <h4 className="review-modal-info">Platform: {props.data.platform}</h4>
            <h4 className="review-modal-info">Genre: {props.data.category}</h4>
            <h4 className="review-modal-info">Release Date: {props.data.releaseDate}</h4>
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
