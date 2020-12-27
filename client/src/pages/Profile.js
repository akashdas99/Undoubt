import React from 'react'
import UserQuestions from '../components/UserQuestions';
import UserCard from '../components/UserCard';
import { Link, Route, Switch } from 'react-router-dom';
import Answer from '../components/Answer';

const Profile = ({ match }) => {

    return (
        <>

            {/* User Info */}
            <div className="profile">
                <UserCard userId={match.params.uId} />

                {/* User Questions */}
                <Link className="link" to={`/profile/${match.params.uId}/questions`}>Questions</Link>
                <Link className="link" to={`/profile/${match.params.uId}/answers`}>Answers</Link>
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
