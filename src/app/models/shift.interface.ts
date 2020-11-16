export interface Shift {
    shift_id: string;
    type?: string;
    start: string;
    finish: string;
    date: string;
    client_id?: string;
    guard_id?:string[];
    shift_place?:string;
  }