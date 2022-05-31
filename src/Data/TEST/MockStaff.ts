import { Staff } from "../Staff";

export const MOCK_DATA = [
    new Staff({
        id: 0,
        name: "Jhon Doe",
        department: "Operations",
        meetingRoom: '',
        timeIn: '2010-01-01T12:00:00',
        timeOut: '2010-01-01T12:00:00',
        tagIssue: '',
        tagReturned: false
    }),
    new Staff({
        id: 1,
        name: "Jane Doe",
        department: "Facilities",
        meetingRoom: '',
        timeIn: '2010-01-01T12:00:00',
        timeOut: '2010-01-01T12:00:00',
        tagIssue: '',
        tagReturned: false
    }),
    new Staff({
        id: 2,
        name: "Stephen Doe",
        department: "HR",
        meetingRoom: '',
        timeIn: '2010-01-01T12:00:00',
        timeOut: '2010-01-01T12:00:00',
        tagIssue: '',
        tagReturned: false
    })
];