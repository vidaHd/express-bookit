import { Time } from "../models/Time";

export const timeService = {
  async addOrUpdateAvailableTime(companyId: string, day: string, times: any[]) {
    let timeAvailable = await Time.findOne({ companyId, day });

    if (!timeAvailable) {
      timeAvailable = new Time({ companyId, day, times });
    } else {
      timeAvailable.times = times;
    }

    return await timeAvailable.save();
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
};
