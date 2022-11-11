import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LaodingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityFilters from './ActivityFilters';

import ActivityList from './ActivityList';



export default observer( function ActivityDashboard(){
  const {activityStore}=useStore();
  const{loadingActivites,activityRegitery}=activityStore;

 

  useEffect(() => { 
    if(activityRegitery.size <=1) loadingActivites();
    activityStore.loadingActivites();
  }, [activityRegitery.size,loadingActivites]); 

  
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return(
<Grid>
<Grid.Column width='10'>
<ActivityList 

/>
</Grid.Column>
<Grid.Column width='6'>
   <ActivityFilters/>
</Grid.Column>
</Grid>
    )
    

})