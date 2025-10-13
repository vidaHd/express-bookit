import { Time } from "../models/Time";

const WEEK_DAY_KEYS = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export const timeService = {
 async addOrUpdateAvailableTimesBulk(
    companyId: string,
    timesByDay: Record<string, string[]>
  ) {
    const ops = Object.entries(timesByDay).map(([day, times]) => ({
      updateOne: {
        filter: { companyId, day },
        update: { $set: { times } },
        upsert: true,
      },
    }));

    if (ops.length > 0) {
      await Time.bulkWrite(ops);
    }

    return this.getAllByCompany(companyId);
  },

  async getAll() {
    return await Time.find();
  },

  async getByCompanyAndDay(companyId: string, day: string) {
    return await Time.findOne({ companyId, day });
  },

 async getByCompanyByDay(companyId: string) {
    return await Time.findOne({ companyId });
  },

  async delete(companyId: string, day: string) {
    return await Time.findOneAndDelete({ companyId, day });
  },

  async getAllByCompany(companyId: string) {
    const docs = await Time.find({ companyId }).lean();
    const result: Record<string, string[]> = {};

    WEEK_DAY_KEYS.forEach((d) => {
      result[d] = [];
    });

    docs.forEach((doc: any) => {
      if (doc && doc.day) {
        result[doc.day] = Array.isArray(doc.times) ? doc.times : [];
      }
    });

    return result;
  },  
};
