//IMPORTS
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Review from "./components/review_modal"
//APP TOP LEVEL COMPONENT
const App = () => {
//STATES SETUP
   const [newTitle, setNewTitle] = useState(''); //form item
   const [newImage, setNewImage] = useState(''); //form item
   const [newReleaseDate, setNewReleaseDate] = useState(''); //form item
   const [newPlatform, setNewPlatform] = useState(''); //form item
   const [newCategory, setNewCategory] = useState(''); //form item
   const [newRating, setNewRating] = useState(''); //form item
   const [newReview, setNewReview] = useState(''); //form item
   const [newReviewPerson, setNewReviewPerson] = useState(''); //form item
   const [gameReviews, setGameReviews] = useState([]); //populated data for map

//BUTTONS STATES
   const [viewNewForm, setViewNewForm] = useState(false);

   const [viewReviewModal, setViewReviewModal] = useState(false)

   const [viewEditForm, setViewEditForm] = useState('');

   const [viewHoverEvent, setViewHoverEvent] = useState('');

//USEEFFECT SETS INITIAL STATE ARRAY
   useEffect(() => {
      axios
         .get('https://game-review-back-end.herokuapp.com/reviews')
         .then((response) => {
            setGameReviews(response.data)
         })
   }, [])

//GET DATA WORKS LIKE A PAGE REFRENCE FUNCTION FOR .THEN STATEMENTS!
   const getData = () => {
     axios
     .get('https://game-review-back-end.herokuapp.com/reviews')
     .then((response) => {
        setGameReviews(response.data)
     })
   }

//SUBMIT CREATE NEW FORM HANDLER
   const handleNewReviewFormSubmit = (event) => {
      event.preventDefault();
      axios.post(
         'https://game-review-back-end.herokuapp.com/reviews',
         {
            title:newTitle,
            image:newImage,
            releaseDate:newReleaseDate,
            platform:newPlatform,
            category:newCategory,
            rating:newRating,
            review:newReview,
            reviewPerson:newReviewPerson,
         }
      ).then(() => {
         getData();
      })
   }
//DELETE FUNCTION HANDLER
   const handleDelete = (reviewInfo) => {
      axios
         .delete(`https://game-review-back-end.herokuapp.com/reviews/${reviewInfo._id}`)
         .then(() => {
            getData();
         })
   }
//CREATE EDIT
   const handleEdit = (event, reviewInfo) => {
      event.preventDefault();
      setViewEditForm('');
      axios
         .put(
            `https://game-review-back-end.herokuapp.com/reviews/${reviewInfo._id}`,
            {
               title:newTitle || reviewInfo.title,
               image:newImage || reviewInfo.image,
               releaseDate:newReleaseDate || reviewInfo.releaseDate,
               platform:newPlatform || reviewInfo.platform,
               category:newCategory || reviewInfo.category,
               rating:newRating || reviewInfo.rating,
               review:newReview || reviewInfo.review,
               reviewPerson:newReviewPerson || reviewInfo.reviewPerson,
            }
         ).then(() => {
            getData();
         })
   }
//EVENT HANDLERS FOR FORM
   const handleNewTitle = (event) => {
      setNewTitle(event.target.value);
   }
   const handleNewImage = (event) => {
      setNewImage(event.target.value);
   }
   const handleNewReleaseDate = (event) => {
      setNewReleaseDate(event.target.value);
   };
   const handleNewPlatform = (event) => {
      setNewPlatform(event.target.value);
   }
   const handleNewCategory = (event) => {
      setNewCategory(event.target.value);
   }
   const handleNewRating = (event) => {
      setNewRating(event.target.value);
   }
   const handleNewReview = (event) => {
      setNewReview(event.target.value)
   }
   const handleNewReviewPerson = (event) => {
      setNewReviewPerson(event.target.value)
   }
//BUTTON FUNCTIONS ===========================\\

//VIEW NEW FORM TOGGLE
   const toggleNewForm = (event) => {
       setViewNewForm(!viewNewForm);
   }
//VIEW EDIT FORM TOGGLE
   const toggleEditForm = (event) => {
      setViewEditForm(event.target.value);
   }
//CLOSE EDIT FORM BUTTONS
   const closeEditFormModal = (event) => {
      setViewEditForm('');
   }
//On Hover reaveal Card Info
   const toggleOnHoverEvent = (event) => {
      console.log(event.target);
      setViewHoverEvent(event.target.id)
   }
//============================================\\

//HTML/JSX SETUP
   return (
      <>
      <h1> 🎮 Two Dudes Reviews 🕹 </h1>
{/*FORM DOCUMENT FOR NEW GAME REVIEWS*/}
      <button onClick={toggleNewForm}> New Review </button>
      {viewNewForm &&
         <div className="modalStyle">
      <form onSubmit={handleNewReviewFormSubmit}>
         <p>
            <label>Title:</label>
            <input
               type="text"
               onChange={handleNewTitle}
            />
         </p>
         <p>
            <label>Image:</label>
            <input
               type="text"
               onChange={handleNewImage}
            />
         </p>
         <p>
            <label>Platforms:</label>
            <input
               type="text"
               onChange={handleNewPlatform}
            />
         </p>
         <p>
            <label>Release Date: </label>
            <input
               type="text"
               onChange={handleNewReleaseDate}
            />
         </p>
         <p>
            <label>Genre:</label>
            <input
               type="text"
               onChange={handleNewCategory}
            />
         </p>
         <p>
            <label>Rating:</label>
            <input
               type="text"
               onChange={handleNewRating}
            />
         </p>
         <p>
            <label>Review:</label>
            <br />
            <textarea
               type="text"
               onChange={handleNewReview}
               rows="10"
               cols="60"
            >
            </textarea>
            <br />
         </p>
         <p>
            <label>Reviewer:</label>
            <input
               type="text"
               onChange={handleNewReviewPerson}
            />
         </p>
         <input
            type="submit"
            value="Submit Review"
         />
         <button onClick={toggleNewForm}> Close </button>
      </form>
         </div>}
      {/*REVIEW MODAL*/}
      <div>
        <button onClick={() => setViewReviewModal(true)}>Show Review</button>
        <Review title="Placeholder Title" onClose={() => setViewReviewModal(false)}
        viewReviewModal={viewReviewModal}/>
      </div>
      {/*HERE ENDS REVIEW MODAL*/}

{/*MAP DATA FOR CREATING THE INDEX OF REVIEWS*/}
      <div className="flexContainer">
         {gameReviews.map((review) => {
            return(

              <div id={review._id} className="greaterCard">
               <div id={review._id} onClick={() => setViewReviewModal(true)} className="limit" onMouseOver={toggleOnHoverEvent}>
                  <h1 id={review._id}>{review.title}</h1>
                  <img id={review._id} src={review.image} alt="Bad Source"></img>
                  <p id={review._id}>Review Score: {review.rating}</p>
                  <p id={review._id}>Released: {review.releaseDate}</p>
                  <div id={review._id} className="dropDown" style= { viewHoverEvent === review._id ? {'visibility' : 'visible', "transition-duration": '.25s' } : {'visibility' : 'hidden', "font-size":"0px"}}>
                     <p id={review._id}>Platform: {review.platform}</p>
                     <p id={review._id}>Genre: {review.category}</p>
                     {/*<p id={review._id}>Review: {review.review}</p>*/}
                     <p id={review._id}>Reviewed by: {review.reviewPerson}</p>
                     {/*DELETE BUTTON*/}
                     <div className="buttonWrap">
                        <button id={review._id} onClick={() =>
                           {handleDelete(review)}}>Delete Review</button>
                        {/*EDIT BUTTON*/}
                        <button id={review._id} value={review._id} onClick={toggleEditForm}> Edit Review </button>
                     </div>
                  </div>
               </div>
            {/*EDIT FORM*/}
                {viewEditForm === review._id &&
                   <div className="modalStyle">
                 <form onSubmit={ (event) => { handleEdit(event, review) } }>
                    <p>
                       <label>Title:</label>
                       <input
                          type="text"
                          onChange={handleNewTitle}
                          defaultValue={review.title}
                       />
                    </p>
                    <p>
                       <label>Image:</label>
                       <input
                          type="text"
                          onChange={handleNewImage}
                          defaultValue={review.image}
                       />
                    </p>
                    <p>
                       <label>Platforms:</label>
                       <input
                          type="text"
                          onChange={handleNewPlatform}
                          defaultValue={review.platform}
                       />
                    </p>
                    <p>
                       <label>Release Date: </label>
                       <input
                          type="text"
                          onChange={handleNewReleaseDate}
                          defaultValue={review.releaseDate}
                       />
                    </p>
                    <p>
                       <label>Genre:</label>
                       <input
                          type="text"
                          onChange={handleNewCategory}
                          defaultValue={review.category}
                       />
                    </p>
                    <p>
                       <label>Rating:</label>
                       <input
                          type="text"
                          onChange={handleNewRating}
                          defaultValue={review.rating}
                       />
                    </p>
                    <p>
                       <label>Review:</label>
                       <br />
                       <textarea
                          type="text"
                          onChange={handleNewReview}
                          rows="10"
                          cols="60"
                          defaultValue={review.review}
                       >
                       </textarea>
                       <br />
                    </p>
                    <p>
                       <label>Reviewer:</label>
                       <input
                          type="text"
                          onChange={handleNewReviewPerson}
                          defaultValue={review.reviewPerson}
                       />
                    </p>
                    <input
                       className = "editSub"
                       type="submit"
                       value="Submit Edits"
                    />
                    <button onClick={closeEditFormModal}>close</button>
                 </form>
                 </div>
              }
                 {/*HERE END THE EDIT FORM*/}
              </div>
              //HERE ENDS THE GREATER CARD BODY
            )
         })}
      </div>
      {/*HERE ENDS THE MAP CONTAINER*/}
      </>
      //HERE ENDS THE RETURN JSX
   )
}
/*=============================================*/
export default App;
