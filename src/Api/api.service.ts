import { AxiosResponse } from "axios";
import { Staff } from "../Data/Staff";

const axios = require('axios');


/* from https://www.delftstack.com/howto/typescript/axios-typescript/ */

export interface IStaff {
    id: number,
    name: string,
    department: string;
}

export interface IDailyFormNamDep {
    form: {
        day:Date,
        id: number, 
        name: number, 
        room: string,
        time_in: string,
        time_out: string,
        tag: string,
        tag_ret: boolean,
        name_dep: {staff_name: string, staff_dept: string}
    }        
}

export interface IDailyForm {
    day: Date,
    id: number | undefined,
    name: number,
    room: string,
    time_in: string,
    time_out: string,
    tag: string,
    tag_ret: boolean
    
}

const http = axios.create({
    baseURL: 'http://candidate-backend-dev.eu-west-2.elasticbeanstalk.com/api',
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

const JsonRequest  = {
    get: (url:string) => http.get(url).then(responseBody),
    post: (url:string, body:JSON) => http.post(url, body).then(responseBody),
    put: (url:string, body:JSON) => http.put(url,body).then(responseBody),
    delete: (url:string) => http.delete(url).then(responseBody)
}

export const StaffApiService = {
    getAllStaff : () : Promise<IStaff[]> => {
        console.log('res');
        return StaffRequests.get('/staff/all')},
    getStaffByID : (id:number | undefined) : Promise<IStaff> => StaffRequests.get(`/staff/${id}`),
    getDay: (day:string) : Promise<IDailyFormNamDep[]> => DailyFormRequests.get(`/daily_form/day/${day}`),
    getAllDays: () : Promise<IDailyFormNamDep[]> => {
        console.log('res');
        return DailyFormRequests.get('/daily_form/all_days')},
    getRowByID: (id: number | undefined) : Promise<IDailyFormNamDep> => DailyFormRequests.get(`/daily_form/row_id/${id}`),
    addRoom: (day_form:IDailyForm) : Promise<IDailyForm> => DailyFormRequests.post('/daily_form/room', day_form),
    addRoomJSON: (day_form:JSON) : Promise<JSON> => JsonRequest.post('/daily_form/room', day_form),
    addTimeInOut: (day_form:IDailyForm) : Promise<IDailyForm> => DailyFormRequests.post('/daily_form/time', day_form),
    addTimeInOutJSON: (data:JSON): Promise<JSON> => JsonRequest.post('/daily_form/time', data),
    addTag: (day_form:IDailyForm): Promise<IDailyForm> => DailyFormRequests.post('/daily_form/tag', day_form),
    addTagJSON: (data:JSON): Promise<JSON> => JsonRequest.post('/daily_form/tag', data),
    addTagRet: (day_form:IDailyForm): Promise<IDailyForm> => DailyFormRequests.post('/daily_form/tag_ret', day_form),
    addTagRetJSON: (data:JSON): Promise<JSON> => JsonRequest.post('/daily_form/tag_ret', data),
    addNewRow: (data:JSON): Promise<JSON> => JsonRequest.put('/daily_form/add_new_entry', data),
    deleteEntry: (entry:number|undefined): Promise<JSON> => JsonRequest.delete(`/daily_form/delete_entry/${entry}`),
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



