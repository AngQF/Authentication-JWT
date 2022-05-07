const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {btnLogoutStyle: {display: "none"}},
    actions: {
      changeBtnStyle : () =>{
        setStore({btnLogoutStyle: {display: "inline-block"}})
      }
     },
  };
};

export default getState;
