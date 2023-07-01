import { Link } from "react-router-dom";

const Anecdote = ({ anecdote }) => {
    return (
    <>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <Link to={anecdote.info}>{anecdote.info}</Link></p>
    </>
    );
}

export default Anecdote;