import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer( function ActivityForm() {
  
  const {activityStore}=useStore();
  const{selectedActivity,closeForm,cretaeActivity,updateActivity,loading}=activityStore;
  
  const initialStat = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  };

  const [activity ,setActivitiy]= useState(initialStat);
function handleSubmit(){
   activity.id ? updateActivity(activity) : cretaeActivity(activity);
}

function handleInputChange(event :ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const{name,value} =event.target;
    setActivitiy({...activity,[name]:value})

}




  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autocomplet='off'>
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder="description" value={activity.description} name='description' onChange={handleInputChange} />
        <Form.Input placeholder="category" value={activity.category} name='category' onChange={handleInputChange} />
        <Form.Input type='date' placeholder="Date" value={activity.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          
          type="button"
          content="Cancel"
           color='grey' 
        />
      </Form>
    </Segment>
  );
}
)