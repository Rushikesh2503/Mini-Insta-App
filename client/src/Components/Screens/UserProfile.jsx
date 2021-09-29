import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import styled from "./ModuleCss/Profile.module.css";

const UserProfile = () => {
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    // const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    }, [])
    
    return (
        <>
              {userProfile ?
        <div className={styled.mainDivProf}>
            <div className={styled.prof2}>
                <div>
                    <img  src={userProfile.user.pic} alt="profile" className={styled.prof2_img}  />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                    <div className={styled.prof2_conte} >
                        <h6>{userProfile.posts.length} Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                    </div>
                    </div>
                <div className={styled.gallary}>
               {
                    userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className={styled.item} src={item.photo} alt={item.title}/>  
                       )
                   })
               }
               </div>
            </div> 
            : <h2>loading...!</h2>}
            </>
    )
}

export default UserProfile
