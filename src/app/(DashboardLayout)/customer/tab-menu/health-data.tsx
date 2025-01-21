"use client";

import React, { useState } from "react";
import {
  Button,
  HR,
  Label,
  Select,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import CardBox from "@/app/components/shared/CardBox";
import { Icon } from "@iconify/react/dist/iconify.js";
import Treatments from "@/app/data/ref_right_treatments.json";
import SelectWithSearch from "@/app/components/shared/Autocomplete";

interface HealthDataProps {
  formData: { [key: string]: any }; // Allow flexibility
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>; // Match with formData
  handleSetFormData?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HealthData: React.FC<HealthDataProps> = ({
  formData,
  setFormData,
  handleSetFormData,
}) => { 
  const [drugAllergies, setDrugAllergies] = useState([
    { id: 1, drug: "Paracetamol", reaction: "Shock", notes: "Causes rash" },
  ]);

  const [newEntry, setNewEntry] = useState({
    drug: "",
    reaction: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
  };

  const addNewEntry = () => {
    if (!newEntry.drug.trim() || !newEntry.reaction.trim()) {
      alert("Drug and Reaction fields cannot be empty!");
      return;
    }
    setDrugAllergies((prev) => [...prev, { id: prev.length + 1, ...newEntry }]);
    setNewEntry({ drug: "", reaction: "", notes: "" });
  };

  const removeRow = (id: number) => {
    setDrugAllergies((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="h-fit">
      {/* <h6 className="text-base sm:text-lg mb-2 sm:mb-0">ข้อมูลสุขภาพ</h6> */}

      {/* <h6 className="text-base sm:text-lg mb-2 sm:mb-0">ข้อมูลสุขภาพ</h6> */}
      <div className="flex sm:flex-row flex-col w-full gap-4 pt-2">
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="ประเภทสิทธิ์การรักษาหลัก" />
          </div>
          <SelectWithSearch
                options={Treatments.RECORDS.map((r)=>r.rt_name )}
                placeholder="เลือกประเภทสิทธิ์การรักษาหลัก"
                formValue={formData.treatment_main}
                setFormData={setFormData}
                field="treatment_main"
              />
        </div>
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="ประเภทสิทธิ์การรักษารอง" />
          </div>
          <SelectWithSearch
                options={Treatments.RECORDS.map((r)=>r.rt_name )}
                placeholder="เลือกประเภทสิทธิ์การรักษารอง"
                formValue={formData.treatment_sub}
                setFormData={setFormData}
                field="treatment_sub"
              />
        </div>
      </div>
      <HR />
      <div className="flex sm:flex-row flex-col w-full">
        <div>
          <h6 className="text-sm sm:text-sm">ข้อมูลการแพ้ยา</h6>
          <Table id="allergic" className="mt-4 w-full">
            <Table.Head>
              <Table.HeadCell>ชื่อยา</Table.HeadCell>
              <Table.HeadCell>ความรุนแรง</Table.HeadCell>
              <Table.HeadCell>Notes</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {drugAllergies.map((entry) => (
                <Table.Row key={entry.id}>
                  <Table.Cell>{entry.drug}</Table.Cell>
                  <Table.Cell>{entry.reaction}</Table.Cell>
                  <Table.Cell>{entry.notes}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="error"
                      size="sm"
                      onClick={() => removeRow(entry.id)}
                    >
                      <Icon icon="ic:baseline-minus"> </Icon>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell>
                  <TextInput
                    className="form-rounded-md"
                    placeholder="Enter drug name"
                    value={newEntry.drug}
                    onChange={(e) => handleInputChange("drug", e.target.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Select onChange={(e)=> handleInputChange("reaction",e.target.value)} id="prename" required className="select-md">
                    <option value={"Rash"}>Rash</option>
                    <option value={"Urticaria"}>Urticaria</option>
                    <option value={"Angioedema"}>Angioedema</option>
                    <option value={"Anaphylaxis"}>Anaphylaxis</option>
                    <option value={"Steven-Johnson Syndrom(SJS)"}>Steven-Johnson Syndrom(SJS)</option>
                    <option value={"Toxic Erpidermal Necrolysis (TEN)"}>Toxic Erpidermal Necrolysis (TEN)</option>
                    <option value={"Drug Rash with Eosinophilia and Systemic Symptoms (DRESS)"}>
                      Drug Rash with Eosinophilia and Systemic Symptoms (DRESS)
                    </option>
                  </Select>
                </Table.Cell>
                <Table.Cell>
                  <Textarea
                    className="form-rounded-md"
                    placeholder="Enter notes"
                    rows={1}
                    value={newEntry.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button color="success" size="sm" onClick={addNewEntry}>
                    <Icon icon="ic:baseline-plus"> </Icon>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <HR />
      </div>
    </div>
  );
};

export default HealthData;
