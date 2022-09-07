interface IGlobalResponseType<T> {
    result:T
    succeeded: true,
    errors: string[]
}





interface IPaginateRequest {
     pageNumber? : number
     pageSize?:number
}