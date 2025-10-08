import { Request, Response } from "express";
import { CompayService } from "../services/user.service";
import { serviceService } from "../services/service.service";

export const createUserService = async (req: Request, res: Response) => {
  try {
    const { price, duration, serviceId, companyId } = req.body;

    if (!price || !duration || !serviceId || !companyId) {
      return res.status(400).json({ error: "تمام فیلدهای لازم را وارد کنید." });
    }

    const newService = await CompayService.createService({
      price,
      duration,
      serviceId,
      companyId,
    });

    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

export const getAllServicesByCompanyId = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyId } = req.params;
    const userServices = await CompayService.getAllServicesByCompanyId(
      companyId
    );

    const services = await serviceService.getServices({
      ids: userServices.map((us) => us.serviceId),
    });

    const response = userServices.map((us) => ({
      price: us.price ?? "-",
      duration: us.duration ?? "-",
      serviceId: us.serviceId,
      companyId: us.companyId,
      title: services.find((s) => s._id.toString() === us.serviceId)?.title,
    }));
    // const services = userServices.map(async (us) => {
    //   const service = await serviceService.getServicesByServiceId(us.serviceId);
    //   return {
    //     price: us.price,
    //     duration: us.duration,
    //     serviceId: us.serviceId,
    //     title: service.title,
    //   };
    // });
    console.log(response);

    if (!response.length) {
      return res
        .status(404)
        .json({ message: "هیچ سرویسی برای این شرکت یافت نشد." });
    }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
export const updateUserServicesBulk = async (req: Request, res: Response) => {
  try {
    const { serviceIds, data } = req.body;
    const { companyId } = req.params;

    const results = await CompayService.updateServicesBulk(
      companyId,
      serviceIds,
      data
    );

    res.status(200).json({
      message: "سرویس‌ها با موفقیت به‌روزرسانی شدند.",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { serviceId, price, duration } = req.body;
    const { companyId } = req.params;

    const result = await CompayService.updateService(
      serviceId,
      companyId,
      price,
      duration
    );

    res.status(200).json({
      message: "سرویس با موفقیت به‌روزرسانی شد.",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};


export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const { serviceId, companyId } = req.params;

    const deleted = await CompayService.deleteService(serviceId, companyId);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "سرویس یافت نشد یا قبلاً حذف شده است." });
    }

    res.status(200).json({ message: "سرویس با موفقیت حذف شد." });
  } catch (err) {
    res.status(500).json({ error: "خطای داخلی سرور" });
  }
};
