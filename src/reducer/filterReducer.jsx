import React from 'react'

const filterReducer = (state, action) => {
  switch (action.type){
    case "LOAD_FILTER_PRODUCTS":
        return {
            ...state,
            allProducts:[...action.payload],
            filterProducts:[...action.payload]
        };

      case "SET_GRID_VIEW":
        return {
          ...state,
          gridView:true,
        };

    
  }
  return state
}

export default filterReducer
