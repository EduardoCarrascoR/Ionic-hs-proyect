export interface Shift {
    type?: string;
    start: string;
    finish: string;
    dates: string[];
    client?: string;
    guardsIds?:string[];
    shiftPlace?:string;
  }