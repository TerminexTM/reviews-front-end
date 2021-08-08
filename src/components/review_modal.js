import React from "react"

const Review = (props) => {

  if(!props.viewReviewModal){
    return null
  }

  return(
    <div className="review-modal-box">
      <div className="review-modal-content">
        <h2>Review</h2>
        <div className="review-modal-body">
          Yo Yo Yo this is a review.
        </div>
        <div className="review-modal-footer">
          <button className="buttons">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Review
