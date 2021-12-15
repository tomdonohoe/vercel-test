export interface PhotoDetails {
    id: number;
    category: string;
}

export interface Photos {
   [Categories: string]: PhotoDetails[];
}
