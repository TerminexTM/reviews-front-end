//IMPORTS
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
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

//VIEW NEW FORM TOGGLE
   const toggleNewForm = (event) => {
       setViewNewForm(!viewNewForm);
   }

//HTML/JSX SETUP
   return (
      <>
      <h1> 🎮 Hello World 🕹 </h1>
{/*FORM DOCUMENT FOR NEW GAME REVIEWS*/}
      <button onClick={toggleNewForm}> Add New Review! </button>
      {viewNewForm &&
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
      </form>}

{/*MAP DATA FOR CREATING THE INDEX OF REVIEWS*/}
      <div className="flexContainer">
         {gameReviews.map((review) => {
            return(
              <div className="greaterCard">
               <div className="limit">
                  <h1>{review.title}</h1>
                  <img src={review.image} alt="Bad Source"></img>
                  <p>Released: {review.releaseDate}</p>
                  <p>Platform: {review.platform}</p>
                  <p>Genre: {review.category}</p>
                  <p>Review Score: {review.rating}</p>
                  <p>Review: {review.review}</p>
                  <p>Reviewed by: {review.reviewPerson}</p>
               </div>
{/*JSX BUTTON FOR DELETE AND EDIT ROUTES*/}
            {/*DELETE BUTTON*/}
               <button onClick={() =>
                 {handleDelete(review)}}>Delete Review</button>
                 <br/>
            {/*EDIT FORM*/}
                <details>
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
                       type="submit"
                       value="Submit Edits"
                    />
                 </form>
                 {/*HERE END THE EDIT FORM*/}
                </details>
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
