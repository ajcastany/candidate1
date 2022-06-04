import http from './http-commons';

class ApiService {
    getAllStaff() {return http.get('/staff/all');}
    getStaff(id:number) {return http.get('/staff/${id}');}
    getDay(day:string) {return http.get('/daily_form/${day}');}
    getAllDays() {return http.get('/daily_form/all_days');}
    addRoom(data:string) {return http.post('/daily_form/room', data);}
    addTimeInOut(data:string) {return http.post('/daily_form/time', data);}
    addTag(data:string) {return http.post('/daily_form/tag', data);}
    tagRet(data:string) {return http.post('/daily_form/tag_ret', data);}
}

export default new ApiService();





