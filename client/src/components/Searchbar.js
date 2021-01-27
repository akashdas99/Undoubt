import React, { useEffect, useState, useRef } from 'react'
import { searchQuestion } from '../services/questionapicalls';
import { Link } from 'react-router-dom';
const Searchbar = () => {
    const [list, setlist] = useState([])
    const [search, setsearch] = useState("")
    const [focus, setfocus] = useState(false)

    const handleChange = e => {
        setsearch(e.target.value)
        searchQuestion(e.target.value)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setlist(data);
                    console.log(list);
                }
            })
    }

    const submitHandler = value => {
        setfocus(false);
        setsearch(value);
    }

    let suggestionRef = useRef();

    useEffect(() => {
        const handler = e => {
            if (!suggestionRef.current.contains(e.target)) {
                setfocus(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    })

    return (
        <form className="search" ref={suggestionRef} onSubmit={e => { e.preventDefault(); }}>
            <input className="header__searchInput"
                type="text"
                onChange={handleChange}
                value={search}
                onFocus={() => setfocus(true)}
                placeholder="Search for Questions" />
            {/* search suggestions */}
            {list && focus &&
                <ul className="search_list">
                    {list.length > 0 && list.map((item) => (
                        <Link className="search_item"
                            to={`/question/${item._id}`}
                            onClick={() => submitHandler(item.description)}>
                            <li key={item._id} >{item.description}</li>
                        </Link>
                    ))}
                    {list.length === 0 &&
                        <li style={{ textAlign: "center" }}>No Questions</li>
                    }
                </ul>}
        </form>
    )
}

export default Searchbar
////working