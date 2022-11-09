import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActvitvityStore {
  
    activityRegitery=new Map<string , Activity>();
    selectedActivity: Activity | undefined = undefined;

    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    get activityByDate(){
        return Array.from(this.activityRegitery.values()).sort((a,b)=>
        Date.parse(a.date)-Date.parse(b.date));
    }

    loadingActivites = async () => {
     

        try {
            const activities = await agent.Activities.list();

            activities.forEach((activity) => {
                activity.date = activity.date.split("T")[0];
               this.activityRegitery.set(activity.id,activity);
            })
            this.setLoadingInitial(false);



        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);




        }

    }

    setLoadingInitial = (stat: boolean) => {
        this.loadingInitial = stat;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegitery.get(id);
    }
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
    cretaeActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {

            await agent.Activities.create(activity);
            runInAction(() => {

                this.activityRegitery.set(activity.id,activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegitery.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegitery.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;


            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }

    }
};