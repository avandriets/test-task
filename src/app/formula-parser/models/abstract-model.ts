export class AbstractModel<T> {

  public constructor(protected data: T) {
  }

  public getData(): T {
    return { ...this.data as any };
  }
}
