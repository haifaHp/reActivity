import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LaodingComponent";

function App() {
  const [activities,  setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
const[Loading,setloading]=useState(true);
const[submitting,setSubmitting]=useState(false);

  useEffect(() => {
    agent.Activities.list().then((Response) => {
      let activities: Activity[] = [];
      Response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setloading(false)

    });
  }, []);

  function handleSelectActivity(id: string) {
   
    setSelectedActivity(activities.find((x) => x.id == id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handlrFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    console.log('11');
    if(activity.id){
      console.log('2');

      agent.Activities.update(activity).then(()=>{

        setActivities([...activities.filter((x) => x.id !== activity.id),activity,]);
    console.log('4');

        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity ]);
        setEditMode(false);
        setSubmitting(false);
      })

    }
    
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter((x) => x.id !== id)]);
setSubmitting(false)
    })

  }
if(Loading) return <LoadingComponent content="Loading app" />
  return (
    <>
      <NavBar openForm={handlrFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelselectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handlrFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
