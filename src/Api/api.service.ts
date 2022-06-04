import http from './http-commons';

class ApiService {
    getAllStaff() {return http.get('/api/staff/all');}
    getStaff(id:number) {return http.get('/api/staff/${id}');}
    getDay(day:string) {return http.get('/api/daily_form/${day}');}
    getAllDays() {return http.get('/api/daily_form/all_days');}
    addRoom(data:string) {return http.post('/api/daily_form/room', data);}
    addTimeInOut(data:string) {return http.post('/api/daily_form/time', data);}
    addTag(data:string) {return http.post('/api/daily_form/tag', data);}
    tagRet(data:string) {return http.post('api/daily_form/tag_ret', data);}
}

export default new ApiService();





