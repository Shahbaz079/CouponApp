export interface ICoupon {
  _id: string;
  code: string;
  status: "available" | "claimed";
}

export interface IClaim {
  _id: string;
  ip: string;
  timestamp: Date;
}
