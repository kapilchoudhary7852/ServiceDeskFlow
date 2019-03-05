export interface Ticket {
    _id: string;
    ServiceDeskId: string;
    PriorityId: Number;
    IssueTitle: string;
    Description: string;
    Comment: string;
    Status: Number;
    CreatedBy: String;
    Assigned: String;
    IsActive: Boolean;
    NotifyTo: string[];
    ResolvedDate:Date;
    ServiceDeskName: string;
    PriorityName: Number;
    StatusName: Number;
    CreatedName: String;
    AssignedName: String;
    NotifyToName: string[];
    ResolvedDuration:Number;
    Image:String;
}
