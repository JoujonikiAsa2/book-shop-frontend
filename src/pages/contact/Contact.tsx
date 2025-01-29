import image from "../../assets/contact.jpg";
// import BSForm from "@/components/form/Form";
import { FieldValues, useForm } from "react-hook-form";
// import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import BSInput from "@/components/form/Input";
import BSForm from "@/components/form/Form";
import { sendEmail } from "@/utils/sendEmail";
import BSTextarea from "@/components/form/Textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";
import CustomBanner from "@/components/shared/CustomBanner";
const Contact = () => {
  const form = useForm();
  const { resetField } = form;
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICEID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATEID;
    const publicId = import.meta.env.VITE_EMAILJS_PUBLICKEY;
    await sendEmail(serviceID, templateID, publicId, data, toastId);
    resetField("name", { defaultValue: "" });
    resetField("email", { defaultValue: "" });
    resetField("subject", { defaultValue: "" });
    resetField("message", { defaultValue: "" });
  };
  return (
    <div className="w-full">
      <div className="pb-12 relative">
        <CustomBanner image={image} sectionTitle="Contact" description="Feel free to reach us for any queries" />
      </div>
      <div className="w-full">
        <div className="max-w-2xl mx-auto py-12 bg-white border m-12 p-12 shadow-2xl">
          <BSForm form={form} onSubmit={onSubmit}>
            <BSInput
              type="text"
              name="name"
              label="Name"
              placeholder="Enter your name here"
              form={form}
              required={true}
            />
            <BSInput
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email address here"
              form={form}
              required={true}
            />
            <BSInput
              type="text"
              name="subject"
              label="Subject"
              placeholder="Enter subject here"
              form={form}
              required={true}
            />
            <BSTextarea
              name="message"
              label="Message"
              placeholder="Write your message"
              form={form}
              required={true}
            />
            <Button type="submit" className="w-full">
              Submit <Send></Send>
            </Button>
          </BSForm>
        </div>
      </div>
    </div>
  );
};

export default Contact;
