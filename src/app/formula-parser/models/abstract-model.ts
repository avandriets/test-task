export class AbstractModel<T> {

  constructor(protected data: T) {
  }

  getData(): T {
    return { ...this.data as any };
  }
}
