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
   const [newUserName, setNewUserName] = useState ('');
   const [newPassword, setNewPassword] = useState ('');
   //States for login and user Info
   const [toggleLogin, setToggleLogin] = useState(true)
   const [toggleError, setToggleError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [toggleLogout, setToggleLogout] = useState(false)
   const [currentUser, setCurrentUser] = useState({})
//BUTTONS STATES
   const [viewNewForm, setViewNewForm] = useState(false);

   const [viewReviewModal, setViewReviewModal] = useState('')

   const [viewEditForm, setViewEditForm] = useState('');

   const [viewHoverEvent, setViewHoverEvent] = useState('');

   const [viewNewUser, setViewNewUser] = useState('');

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
      setViewNewForm(!viewNewForm)
      event.preventDefault();
      axios.post(
         'https://game-review-back-end.herokuapp.com/reviews',
         {
            title:newTitle || `You've just made a Nick Banana`,
            image:newImage || `https://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/krabs_rag3do.jpg`,
            releaseDate:newReleaseDate || 2020,
            platform:newPlatform || 'PC',
            category:newCategory || 'Horror',
            rating:newRating || 1,
            review:newReview || `Thats one good looking banana`,
            reviewPerson: currentUser.username
         }
      ).then(() => {
         getData();
      })
   }

//NEW USER & LOGIN/LOGOUT FUNCTIONALITY

//new user submit form
  const handleNewUserFormSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setNewUserName('');
    setNewPassword('');
    handleToggleForm();
    axios.post(
      'https://game-review-back-end.herokuapp.com/users',
      {
        username:newUserName,
        password:newPassword
      }
      ).then((response) => {
         if(response.data.username){
            console.log(response);
            setToggleError(false);
            setErrorMessage('');
            setCurrentUser(response.data);
            handleToggleLogout();
         } else {
            setErrorMessage(response.data);
            setToggleError(true);
         }
      }
      )
   }
//HANDLE THE LOGIN
   const handleLogin = (event) => {
     event.preventDefault();
     event.currentTarget.reset();
     setNewUserName('');
     setNewPassword('');
   axios.put('https://game-review-back-end.herokuapp.com/users',
   {
      username: newUserName,
      password: newPassword
   }
   ).then((response) => {
     if(response.data.username){
      console.log(response);
      setToggleError(false)
      setErrorMessage('')
      setCurrentUser(response.data)
      handleToggleLogout()
     } else {
      console.log(response);
      setToggleError(true)
      setErrorMessage(response.data)
     }
   })
 }
//login logout toggles
//set CurrentUser as empty
   const handleLogout = () => {
      setCurrentUser({})
      handleToggleLogout();
   }
//show hide logout
   const handleToggleLogout = () => {
      if(toggleLogout) {
         setToggleLogout(false)
      } else {
         setToggleLogout(true)
      }
   }
//show hide form
   const handleToggleForm = () => {
      setToggleError(false);
      if(toggleLogin === true) {
         setToggleLogin(false);
      } else {
         setToggleLogin(true);
      }
   }
   //===============================================\\
//DELETE FUNCTION HANDLER
   const handleDelete = (reviewInfo) => {
      setViewReviewModal('');
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
      setViewReviewModal('');
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
   const handleNewUserName = (event) => {
      setNewUserName(event.target.value)
   }
   const handleNewPassword = (event) => {
      setNewPassword(event.target.value)
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
      setViewReviewModal('');
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
{/* ============START OF NAV=============================== */}
    <div className="navbar">
    <h2 className='logoController'>🎮</h2>
      <h1> Two Dudes Reviews </h1>
      {toggleLogout ?
         <>
          <button className="newButton" onClick={toggleNewForm}> New Review </button>
          <button onClick={handleLogout} class='logoutBtn'>Logout</button>
          <p>Welcome: {currentUser.username}</p>
         </> :
          <div class='appFormDiv'>
            {toggleLogin ?
              //login form
              <div className="formContainer">
                <form onSubmit={handleLogin} class='inputForm'>
                  <input type='text' placeholder='username' class='textInput' onChange={handleNewUserName}/>
                  <input type='password' placeholder='password' class='textInput' onChange={handleNewPassword}/>
                  {toggleError ?
                    <h5 class='errorMsg'>{errorMessage}</h5>
                    :
                    null
                  }
                  <input type='submit' value='Login' class='submitBtn'/>
                </form>
              </div>
            :
            // new user form
            <div className="App" class='formContainer'>
              <form onSubmit={handleNewUserFormSubmit} class='inputForm'>
                <input type='text' placeholder='username' class='textInput' onChange={handleNewUserName}/>
                <input type='password' placeholder='password' class='textInput' onChange={handleNewPassword}/>
                {toggleError ?
                  <h5 class='errorMsg'>{errorMessage}</h5>
                  :
                  null
                }
                <input type='submit' value='Register' class='submitBtn'/>
              </form>
            </div>
            }
            <button onClick={handleToggleForm} class='accountBtn'>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
          </div>
        }
    </div>
{/* ============END OF NAV=============================== */}
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
            <select
               onChange={handleNewPlatform}
            >
            <option>Mac</option>
            <option>PC</option>
            <option>Nintendo</option>
            <option>Super Nintendo</option>
            <option>Nintendo 64</option>
            <option>Game Cube</option>
            <option>Wii</option>
            <option>Wii U</option>
            <option>Nintendo Switch</option>
            <option>GameBoy</option>
            <option>GameBoy Advance</option>
            <option>DS/3DS</option>
            <option>Playstation</option>
            <option>Playstation 2</option>
            <option>Playstation 3</option>
            <option>Playstation 4</option>
            <option>Playstation 5</option>
            <option>PSP</option>
            <option>Playstation Portable</option>
            <option>Xbox</option>
            <option>Xbox 360</option>
            <option>Xbox One</option>
            <option>Xbox Series X</option>
            </select>
         </p>
         <p>
            <label>Release Date: </label>
            <input
               type="date"
               onChange={handleNewReleaseDate}
            />
         </p>
         <p>
            <label>Genre:</label>

            <select
               type="text"
               onChange={handleNewCategory}
               size='1'
            >
               <option>Horror</option>
               <option>RPG</option>
               <option>Shooter</option>
               <option>Sports</option>
               <option>Platformer</option>
               <option>Adventure</option>
               <option>Action</option>
               <option>MOBA</option>
               <option>Roguelike</option>
            </select>

         </p>
         <p>
            <label>Rating:</label>
            <select
               type="text"
               onChange={handleNewRating}
            >
            <option value='1'>&#11088;</option>
            <option value='2'>&#11088;&#11088;</option>
            <option value='3'>&#11088;&#11088;&#11088;</option>
            <option value='4'>&#11088;&#11088;&#11088;&#11088;</option>
            <option value='5'>&#11088;&#11088;&#11088;&#11088;&#11088;</option>
            </select>
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
            <label>Reviewed by: {currentUser.username}</label>
         </p>
         <input
            type="submit"
            value="Submit Review"
         />
         <button onClick={toggleNewForm}> Close </button>
      </form>
         </div>
      }



{/*MAP DATA FOR CREATING THE INDEX OF REVIEWS*/}
{/*JS FOR CREATING STARS FOR THE REVIEW*/}
      <div className="flexContainer">
         {gameReviews.map((review) => {
            const stars = [];
            for(let i=0;i<review.rating;i++){
               stars.push(<i id={review._id}>&#11088;</i>);
            }
            return(

              <div id={review._id} className="greaterCard">
              {currentUser.username &&
              <div className="buttonWrap">
                 <button className="fas fa-trash-alt trash" onClick={() => handleDelete(review)}></button>
                 {/*EDIT BUTTON*/}
                 <button className="fas fa-pencil-alt pencil" value={review._id} onClick={toggleEditForm}></button>
              </div>
              }
               <div id={review._id} value={review._id} onClick={(event) => setViewReviewModal(event.target.id)} className="limit" onMouseOver={toggleOnHoverEvent}>
               <Review data={review} onClose={() => setViewReviewModal(false)}
               viewReviewModal={viewReviewModal}/>
               <img id={review._id} src={review.image} alt="Bad Source"></img>
               <div className="titleCard">
                  <h1 id={review._id} style={review.title.length >= 15 ? {'font-size':'16px'} : {'font-size' : '28px'}}>{review.title}</h1>
               </div>

                  <p id={review._id}>Review Score: {stars}</p>
                  <p id={review._id}>Reviewed by: {review.reviewPerson}</p>
                  <div id={review._id} className="dropDown" style= { viewHoverEvent === review._id ? {'visibility' : 'visible', "transition-duration": '.25s' } : {'visibility' : 'hidden', "font-size":"0px"}}>
                    <p id={review._id}>Platform: {review.platform}</p>
                     <p id={review._id}>Released: {review.releaseDate}</p>
                     <p id={review._id}>Genre: {review.category}</p>
                     {/*<p id={review._id}>Review: {review.review}</p>*/}

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
                       <select
                          onChange={handleNewPlatform}
                          defaultValue={review.platform}
                       >
                       <option>PC</option>
                       <option>Mac</option>
                       <option>Xbox</option>
                       <option>Playstation</option>
                       <option>Switch</option>
                       </select>
                    </p>
                    <p>
                       <label>Release Date: </label>
                       <input
                          type="date"
                          onChange={handleNewReleaseDate}
                          defaultValue={review.releaseDate}
                       />
                    </p>
                    <p>
                       <label>Genre:</label>
                       <select
                          type="text"
                          onChange={handleNewCategory}
                          defaultValue={review.category}
                       >
                          <option>Horror</option>
                          <option>RPG</option>
                          <option>Shooter</option>
                          <option>Sports</option>
                          <option>Platformer</option>
                          <option>Adventure</option>
                          <option>Action</option>
                          <option>MOBA</option>
                          <option>Roguelike</option>
                       </select>
                    </p>
                    <p>
                       <label>Rating:</label>
                       <select
                          type="text"
                          onChange={handleNewRating}
                          defaultValue={review.rating}
                       >
                       <option value='1'>&#11088;</option>
                       <option value='2'>&#11088;&#11088;</option>
                       <option value='3'>&#11088;&#11088;&#11088;</option>
                       <option value='4'>&#11088;&#11088;&#11088;&#11088;</option>
                       <option value='5'>&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                       </select>
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
