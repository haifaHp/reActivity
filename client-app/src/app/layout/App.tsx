import React, { useEffect, useState } from 'react';




import axios from 'axios';
import { List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);

  useEffect(() => {
   axios.get<Activity[]>('http://localhost:5000/api/activities').then(
    response=>{
      console.log(response.data);
      setActivities(response.data)
    })
  }, [])



  return (
    <div >
   <NavBar/>
     
   
     <List/>
      
        <List>
          {activities.map(activity => (

            <li key={activity.id}>
              {activity.title}

            </li>
          ))}
        </List>
       
     
    </div>
  );
}

export default App;
