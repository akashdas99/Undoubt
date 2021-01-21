import React from 'react'
import UserQuestions from '../components/UserQuestions';
import UserCard from '../components/UserCard';
import { NavLink, Route, Switch } from 'react-router-dom';
import Answer from '../components/Answer';

const Profile = ({ match }) => {

    return (
        <>

            {/* User Info */}
            <div className="profile">
                <UserCard user={match.params.uId} />

                {/* User Questions */}
                <NavLink className="link" activeClassName="active-neo link" to={`/profile/${match.params.uId}/questions`}>Questions</NavLink>
                <NavLink className="link" activeClassName="active-neo link" to={`/profile/${match.params.uId}/answers`}>Answers</NavLink>
            </div>
            {/* User Answers */}
            {/* <BrowserRouter> */}
            <div>
                <Switch>
                    <Route path="/profile/:uId/questions" component={UserQuestions} />
                    <Route path="/profile/:uId/answers" component={Answer} />

                </Switch>
            </div>
            {/* </BrowserRouter> */}
        </>
    )
}

export default Profile
