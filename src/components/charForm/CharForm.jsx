import React from 'react'

import './CharForm.scss'
const CharForm = props => {
  return (
         <div className="char__search-form">
            <form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <input 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        >
                        <div className="inner">find</div>
                    </button>
                </div>    
            </form>
      </div>
 
  )
}



export default CharForm