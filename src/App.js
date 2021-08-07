//IMPORTS
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
//APP TOP LEVEL COMPONENT
const App = () => {
//STATES SETUP
   const [newTitle, setNewTitle] = useState('');
   const [newImage, setNewImage] = useState('');
   const [newReleaseDate, setNewReleaseDate] = useState('');
   const [newPlatform, setNewPlatform] = useState('');
   const [newCategory, setNewCategory] = useState('');
   const [newRating, setNewRating] = useState('');
   const [newReview, setNewReview] = useState('');
   const [newReviewPerson, setNewReviewPerson] = useState('');
   const [gameReviews, setGameReviews] = useState([]);


//USEEFFECT SETS INITIAL STATE ARRAY
   useEffect(() => {
      axios
         .get('https://game-review-back-end.herokuapp.com/reviews')
         .then((response) => {
            setGameReviews(response.data)
         })
   }, [])

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
         axios
            .get('https://game-review-back-end.herokuapp.com/reviews')
            .then((response) => {
               setGameReviews(response.data)
            })
      })
   }
   const handleDelete = (reviewInfo) => {
      axios
         .delete(`https://game-review-back-end.herokuapp.com/reviews/${reviewInfo._id}`)
         .then(() => {
            axios
               .get('https://game-review-back-end.herokuapp.com/reviews')
               .then((response) => {
                  setGameReviews(response.data)
               })
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
//HTML/JSX SETUP
   return (
      <>
      <h1> 🎮 Hello World 🕹 </h1>
{/*FORM DOCUMENT FOR NEW GAME REVIEWS*/}
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
      </form>
      <div>
         {gameReviews.map((review) => {
            return(
              <div className="greaterCard">
               <div className="limit">
                  <h1>{review.title}</h1>
                  <img src={review.image} alt="Bad Source"></img>
                  <p>{review.releaseDate}</p>
                  <p>{review.platform}</p>
                  <p>{review.category}</p>
                  <p>{review.rating}</p>
                  <p>{review.review}</p>
                  <p>{review.reviewPerson}</p>
               </div>
               <button onClick={() =>
                 {handleDelete(review)}}>Delete Review</button>
                 <br/>
              </div>
            )
         })}
      </div>
      </>
   )
}
/*=============================================*/
export default App;
