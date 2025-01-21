import { HR, Label, Textarea } from "flowbite-react";
import React from "react";

interface DoctorNoteProps {
  formData: { [key: string]: any }; // Allow flexibility
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>; // Match with formData
  handleSetFormData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DoctorNote: React.FC<DoctorNoteProps> = ({
  formData,
  setFormData,
  handleSetFormData,
}) => {
  return (
    <div>
      <div className="flex  flex-col w-full gap-4 pt-2 p-6">
        <div className="w-full md:w-full">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="ประวัติสุขภาพจิต" />
          </div>
          <Textarea
            id="mental_health"
            className="form-rounded-md"
            placeholder="Enter notes"
            rows={6}
            value={formData.mental_health}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                mental_health: e.target.value,
              }));
            }}
          />
        </div>
        <HR />
        <div className="w-full md:w-full">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="โรคประจำตัว" />
          </div>
          <Textarea
            className="form-rounded-md"
            placeholder="Enter notes"
            rows={6}
            value={formData.disease}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                disease: e.target.value,
              }));
            }}
          />
        </div>
        <HR />
        <div className="w-full md:w-full">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="หมายเหตุ" />
          </div>
          <Textarea
            className="form-rounded-md"
            placeholder="Enter notes"
            rows={6}
            value={formData.healt_comment}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                healt_comment: e.target.value,
              }));
            }}
          />
        </div>
        <HR />
        {/* <div className="w-full md:w-full">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="โรคประจำตัว" />
          </div>
          <Textarea
            className="form-rounded-md"
            placeholder="Enter notes"
            rows={6}
              value={newEntry.notes}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                health_comment: e.target.value,
              }));
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DoctorNote;
