import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import QuestionDetails from "./pages/QuestionDetails";
import SignUp from "./pages/Signup";
import AddQuestion from "./pages/AddQuestion";
import AddAnswer from "./pages/AddAnswer";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./services/PrivateRoutes";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="wrapper">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile/:uId" component={Profile} />
            <PrivateRoute path="/addquestion" exact component={AddQuestion} />
            <PrivateRoute path="/addanswer/:qId" exact component={AddAnswer} />
            <Route path="/question/:qId" exact component={QuestionDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Routes;
