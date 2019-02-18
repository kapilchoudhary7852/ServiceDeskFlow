export interface ServiceDesk {
    _id: string;
    Name: string;
    AssignedReminder: Number;
    servicemanager:string[];
    primaryauthority:string[];
    secondaryauthority:string[];
    CreatedBy:   String;
    CreatedDate: Date;
    Description: String;
    IsActive:  Boolean;
}
