/* eslint-disable @typescript-eslint/no-unused-vars */
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
export const sendEmail = (
  serviceID: string,
  templateID: string,
  publicId: string,
  templateParams: Record<string, unknown>,
  toastId: string | number
) => {
  emailjs.send(serviceID, templateID, templateParams, publicId).then(
    () => {
      toast.success("Email sent successfully", { id: toastId });
    },
    () => {
      toast.error("Email sent successfully", { id: toastId });
    }
  );
};
