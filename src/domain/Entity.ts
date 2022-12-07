export abstract class Entity<T>{
    public readonly id: number | undefined;
    public readonly props : T

    constructor(id:number, props: T){
        this.id = id
        this.props = props
    }
}