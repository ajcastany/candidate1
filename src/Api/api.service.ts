import { AxiosResponse } from "Axios";
import { Staff } from "../Data/Staff";

const axios = require('axios');


/* from https://www.delftstack.com/howto/typescript/axios-typescript/ */

export interface IStaff {
    id: number,
    name: string,
    department: string;
}

export interface IDailyForm {
    form: {
        day:Date,
        id: number, 
        name: number, 
        meetingRoom: string,
        timeIn: Date,
        timeOut: Date,
        tagIssue: string,
        tagReturned: boolean},
    name: string,
    department: string
}

const http = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-type": "application/json"
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const StaffRequests = {
    get: (url: string) => http.get(url).then(responseBody)
};

const DailyFormRequests = {
    get: (url:string) => http.get(url).then(responseBody),
    post: (url:string, body:IDailyForm) => http.post(url, body).then(responseBody)
}

export const StaffApiService = {
    getAllStaff : () : Promise<IStaff[]> => {
        console.log('res');
        return StaffRequests.get('/staff/all')},
    getStaffByID : (id:string) : Promise<IStaff> => StaffRequests.get(`/staff/${id}`),
    getDay: (day:string) : Promise<IDailyForm> => DailyFormRequests.get(`/daily_form/${day}`),
    getAllDays: () : Promise<IDailyForm[]> => {
        console.log('res');
        return DailyFormRequests.get('/daily_form/all_days')},
    addRoom: (day_form:IDailyForm) : Promise<IDailyForm> => DailyFormRequests.post('/daily_form/room', day_form),
    addTimeInOut: (day_form:IDailyForm) : Promise<IDailyForm> => DailyFormRequests.post('/daily_form/time', day_form),
    addTag: (day_form:IDailyForm): Promise<IDailyForm> => DailyFormRequests.post('/daily_form/tag', day_form),
    addTagRet: (day_form:IDailyForm): Promise<IDailyForm> => DailyFormRequests.post('/daily_form/tag_ret', day_form)

};

/* 
class ApiService {
    getAllStaff() {return http.get<Staff[]>('/staff/all');}
    getStaff(id:number) {return http.get(`/staff/${id}`);}
    getDay(day:string) {return http.get(`/daily_form/${day}`);}
    getAllDays() {return http.get('/daily_form/all_days');}
    addRoom(data:string) {return http.post('/daily_form/room', data);}
    addTimeInOut(data:string) {return http.post('/daily_form/time', data);}
    addTag(data:string) {return http.post('/daily_form/tag', data);}
    tagRet(data:string) {return http.post('/daily_form/tag_ret', data);}
}

export default new ApiService();

 */



