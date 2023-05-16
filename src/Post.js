import React,{useContext,useState,useEffect} from 'react'
import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom"; 
import {UserContext} from "./UserContext";

//
const post = ({_id,title,summary,cover,content,createdAt,author}) => {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);
   
  const username = userInfo?.username;

  let initComments=[];
  const [newComment, setNewComment] = useState('');
  const [UNAME, setUNAME] = useState(''); // Add username state
  
  if (localStorage.getItem(`comments_${_id}`) === null) {
    initComments = [];
  }
  else {
    initComments=    JSON.parse(localStorage.getItem(`comments_${_id}`))   ;
  }
 const [comments, setComments] = useState(initComments);

  useEffect(() => {
    localStorage.setItem(`comments_${_id}`, JSON.stringify(comments));
  }, [comments]);


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const commentObject = {
        comment: newComment,
        Uname: username
      };
    //  const updatedComments = [...comments, newComment];
     const updatedComments = [...comments, commentObject];

    //  const updatedComments = [
    //   ...comments,
    //   { comments: newComment, UNAME: username } // Include username with each comment
    // ]; 
     setComments(updatedComments);
     console.log(comments);
      setNewComment('');
    }
  }; 

  // const handleCommentClear = () => {
  //   localStorage.removeItem(`comments_${_id}`);
  //   // localStorage.removeItem(`comments_${_id}`);
  //   setComments([]);
  // };
 

  return (
        <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <div >
            <img src={'http://localhost:4000/'+cover} alt="" width='90%' height='70%'/>
            </div>
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
          <p className="info"> 
            <span style={{color:"black"}}>
            Posted By:
            </span>

            <span className=" info"  style={{
          color: '#888',
          fontSize:"1rem",
          fontWeight: "bold"}}>
              {author.username}
            </span> 
            <time>
              <span style={{color:"black" ,marginRight:"9px"}}>
              Posted At: 
              </span>
              {formatISO9075(new Date(createdAt))}
            </time>
          </p>
          <p className="summary">{summary}</p>

          <div className="comment-list">
               {comments !== null && comments.length > 0 ? (
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index}>
            <h4 style={{fontSize:"15px",fontFamily:"sans-serif",fontWeight:"lighter"}}>
            <span>
             <a style={{fontWeight:"bold"}} >{comment.Uname}: </a>
            </span>

            {comment.comment}
            </h4>
            </div>
          ))}
        </div>
      ) : (
        <div>No comments yet</div>
      )}
          </div>

          <div >
                <form className='comment' onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    className="Comment-inp"
                    placeholder="Type Comment"
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                  <button className="Comment-btn" type="submit">
                    Send
                  </button>
                  {/* <button className="Comment-btn" onClick={handleCommentClear}>
                     Clear
                    </button> */}
                </form>
        </div>
        </div>

        
        </div>
   
  );
}

export default post
