import React from "react";
import { Container } from "semantic-ui-react";
 import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomepPage from "../../features/activities/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
 
  const location =useLocation();
  return (
    <>
      <Route exact path='/' component={HomepPage}/>
<Route
path={'/(.+)'}
render={()=>(
  <>
<NavBar />
      <Container style={{ marginTop: "7em" }}>
      <Route path='/activities'exact component={ActivityDashboard}/>
      <Route path='/activities/:id' component={ActivityDetails}/>
      <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
      </Container>
  </>
)}
/>
    
    </>
  );
}

export default observer(App);
