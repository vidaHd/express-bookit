export interface IBooking {
  companyServiceId: string;
  userId: string;
  selectedTimes: { key: string };
  selectedDate: { key: string };
  createdAt: string;
  deletedAt: string | null; 
}
