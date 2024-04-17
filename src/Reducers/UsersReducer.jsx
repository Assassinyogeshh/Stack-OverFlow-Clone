const intialState={
    data:[],
    error:null,
} 

 const usersReducer=(state=intialState, action)=>{

    switch(action.type){
       
         case 'Fetch_All_Users':
                return  {...state, data:action.payload, error:null}
            
                case 'Update_User_Profile':
    
                const upddatedData= state.data.map((state)=>state._id=action.payload._id?action.payload:state)
                
                return {...state, data:upddatedData, error:null}

             case 'Fetch_Failed':
                case 'Updating_Failed':
                    return { ...state, error: action.error };

              default:
                return state;      

    }


}

export default usersReducer


