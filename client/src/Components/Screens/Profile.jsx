import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import styled from "./ModuleCss/Profile.module.css";

const Profile = () => {
    const [mypics,setPics]=useState([])
    const { state, dispatch } = useContext(UserContext)
     const [image,setImage] = useState("")
    
    useEffect(()=>{
       fetch(`/myposts`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
         //console.log('result:', result)
         setPics(result.myposts)
       })
    }, [])
    
     useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","miniinsta")
        data.append("cloud_name","rsbrsb")
        fetch("	https://api.cloudinary.com/v1_1/rsbrsb/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log("result",result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    return (
        <>
        <div className={styled.mainDivProf}>
            <div className={styled.prof22}>
                 <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
                <div>
                    <label className={styled.imgupload} title="Upload New Pic">
                    <input type="file" style={{ display: "none" }} onChange={(e) => updatePhoto(e.target.files[0])}/>
                    <img src={state?state.pic:"loading"} alt="profile" className={styled.prof2_img}  />
                    </label>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div className={styled.prof2_conte} >
                        <h6>
                            {mypics.length} Posts
                        </h6>
                         <h6>
                             {state?state.followers.length:"0"} followers</h6>
                        <h6>
                            {state ? state.following.length : "0"} following
                        </h6>
                    </div>
                </div>
            </div>
              <div>
            {/* <div className="file-field input-field"  style={{margin:"5px 130px"}}>
                <div className="btn #64b5f6 blue darken-1">
                   <span>Update pic</span>
                   <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                   <input className="file-path validate" type="text" />
                </div>
            </div> */}
                        </div>  
            </div>     

            <div className={styled.gallary}>
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className={styled.item} src={item.photo} alt={item.title}/>  
                       )
                   })
               }
            </div>
        </div> 
        </>
    )
}

export default Profile
