const projectID = 'f23p3s983e1x'

export const headerWithProjectIdOnly = () => {
    return {
      headers: {
        projectID: projectID,
      },
    };
  };

export const getHeaderWithProjectIdAndBody = ()=> {
    return{
        headers: { projectId: projectID, "Content-Type": "application/json"},
    };
};

// export const getAuthHeaderConfig = ()=>{
//     const token = sessionStorage.getItem("authToken");
//     if(token){
//         return{
//             headers:{
//                 Authorization: `Bearer ${token}`,
//                 projectId: PROJECT_ID,
//             },
//         };
//     }else{
//         return{
//             error:"user not logged in"
//         }
//     }
// }