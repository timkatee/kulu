import moment from "moment";

export abstract class Entity<T> {
  createdAt: Date | undefined;
  updatedAt: Date | undefined;

  protected constructor(props: Partial<T>) {
    // to be improved
    this.createdAt = moment(new Date()).toDate();
    this.updatedAt = moment(new Date()).toDate();
    // assign data from other sources to entity properties
    Object.assign(this, props);
  }
}
