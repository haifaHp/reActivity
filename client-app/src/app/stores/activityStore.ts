import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";


export default class ActvitvityStore {

    activityRegitery = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;

    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    get activityByDate() {
        return Array.from(this.activityRegitery.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities(){
        return  Object.entries(
            this.activityByDate.reduce((activities,activity)=>{
                const date=activity.date;
                activities[date]=activities[date] ? [...activities[date],activity]:[activity];
                return activities;
            },{ } as {[key:string]:Activity[]})

        )

    }



    loadingActivites = async () => {
        this.loadingInitial=true;

        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);




        }

    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
               
runInAction(()=>{
    this.selectedActivity = activity;
})
                this.setActivity(activity);
                this.setLoadingInitial(false);
            return activity;

            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegitery.set(activity.id, activity);

    }

    private getActivity = (id: string) => {
        return this.activityRegitery.get(id);
    }



    setLoadingInitial = (stat: boolean) => {
        this.loadingInitial = stat;
    }


    cretaeActivity = async (activity: Activity) => {
        this.loading = true;
    
        try {

            await agent.Activities.create(activity);
            runInAction(() => {

                this.activityRegitery.set(activity.id, activity)
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
                this.activityRegitery.set(activity.id, activity);
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
                this.loading = false;


            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }

    }
}