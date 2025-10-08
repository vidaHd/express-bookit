import { UserService } from "../models/UserService";
import { IUserService } from "../types/IUserService";
import { serviceService } from "./service.service";

export const CompayService = {
  async createService(data: {
    price: string;
    duration: string;
    serviceId: string;
    companyId: string;
  }) {
    const newService = new UserService(data);
    return await newService.save();
  },

  async getAllServicesByJobId(jobId: string) {
    return await UserService.find({ jobId });
  },

  async getAllServicesByCompanyId(companyId: string) {
    return await UserService.find({ companyId });
  },

  async deleteService(serviceId: string, companyId: string) {
    return await UserService.findOneAndDelete({ serviceId, companyId });
  },

  async updateService(
    serviceId: string,
    companyId: string,
    price: string,
    duration: string
  ) {
    return await UserService.findOneAndUpdate(
      { serviceId, companyId },
      { $set: { price, duration } }, 
      { new: true } 
    );
  },

  async updateServicesBulk(
    companyId: string,
    serviceIds: string[],
    data?: Partial<IUserService>
  ) {
    const results = await Promise.all(
      serviceIds.map(async (serviceId) => {
        const existing = await UserService.findOne({ serviceId, companyId });
        if (existing) {
          Object.assign(existing, data);
          return await existing.save();
        } else {
          const newService = new UserService({
            serviceId,
            companyId,
            ...data,
          });
          return await newService.save();
        }
      })
    );

    return results;
  },
};
