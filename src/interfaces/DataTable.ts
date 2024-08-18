export interface IHeadersTable{
    key:string,
    title:string,
    width:string,
    align:string,
}

export type Order = boolean | "asc" |"desc";
export type Align = "center" |"end" | "start" | undefined;

export type SortItem = {
    key:string,
    order?:Order
}