/**
 *  Basic implementation of a queue - in this application it is only used to manage waiting puppets.
 */
export class Queue<T> {
  private items: T[] = [];

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public head(): T | undefined {
    if (this.items.length) {
      return this.items[0];
    } else {
      return undefined;
    }
  }

  public tail(): T | undefined {
    if (this.items.length) {
      return this.items[0];
    } else {
      return undefined;
    }
  }

  public isEmpty() {
    return !this.items.length;
  }

  public allItems() {
    return this.items;
  }

  public length() {
    return this.items.length;
  }
}
