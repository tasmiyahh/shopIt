import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) { //If the user enters a keyword with spaces at the beginning or end, trim() will 
            // clean it up before proceeding. For example, if a user types 
            // " searchTerm ", trim() will convert it to "searchTerm".
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(`/`)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        aria-describedby="search_btn"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        name={keyword}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button id="search_btn" className="btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
