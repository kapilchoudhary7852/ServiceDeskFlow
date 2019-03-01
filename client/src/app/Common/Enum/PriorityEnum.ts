export enum PriorityEnum {
    Low = 1, 
    Medium = 2,
    High = 3, 
    Urgent = 4
}

export function getPriorityNameById(id)
{
  return PriorityEnum[id];
}