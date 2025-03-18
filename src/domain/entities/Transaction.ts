export class Transaction {
    constructor(
      public id: string,
      public amount: number,
      public currency: string,
      public date: Date,
      public status: string
    ) {}
  }