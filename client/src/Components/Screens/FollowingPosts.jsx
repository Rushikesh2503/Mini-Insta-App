import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "./ModuleCss/Home.module.css";
import "../../App.css";

const FollowingPosts = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, [])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
             console.log('err:', err)
             
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
          console.log('err:', err)
        })
  }
  
   const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              //console.log(result)
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log('err:', err)
              
          })
    }

  const imageTrial = "https://res.cloudinary.com/rsbrsb/image/upload/v1632979599/blank-profile-picture-973460_640_nqo8um.png";

  return (
    <div className={styled.homeMainDiv}>
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h6 style={{ padding: "10px 0 0 0", margin: "10px 0 10px 10px", display:"flex" }}>
              <div>
                  <img src={item.postedBy.pic?item.postedBy.pic:imageTrial} alt="" style={{width: "40px", height: "40px",borderRadius:"49%",marginRight:"20px"}}/>
                </div>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
                 style={{marginTop:"10px"}}
              >
                {item.postedBy.name}
              </Link>{" "}
              {/* {item.postedBy._id == state._id && (
                <i
                  className="material-icons"
                  style={{
                    float: "right",
                  }}
                  // onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )} */}
            </h6>
            <br />
            <div className="card-image">
              <img src={item.photo} alt="img"/>
            </div>
            <div className="card-content">
              {/* <i className="material-icons" >
                
              </i> */}
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ color: "red",cursor:"pointer"}}
                  
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  favorite
                </i>
              ) : (
                <i
                    className="material-icons"
                    style={{
                      color: "#dcdce0",
                      cursor:"pointer"
                    }}
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  favorite
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingPosts;

