"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Table, Button, TextInput, Select, Textarea } from "flowbite-react";
import React, { useState } from "react";

const contactData = [
  {
    id: 1,
    name: "test",
    tel: "02099993999",
    relationship: "บิดา",
  },
];

const Contact = () => {
  const [contact, setContact] = useState(contactData);
  const [newEntry, setNewEntry] = useState({
    name: "",
    tel: "",
    relationship: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
  };

  const addNewEntry = () => {
    if (!newEntry.name.trim() || !newEntry.tel.trim()) {
      alert("Drug and Reaction fields cannot be empty!");
      return;
    }
    setContact((prev) => [...prev, { id: prev.length + 1, ...newEntry }]);
    setNewEntry({ name: "", tel: "", relationship: "" });
  };

  const removeRow = (id: number) => {
    setContact((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="h-screen">
      <h6 className="text-sm sm:text-sm">ข้อมูลติดต่อ</h6>
      <Table id="allergic" className="mt-4 w-full">
        <Table.Head>
          <Table.HeadCell>ชื่อ-สกุล</Table.HeadCell>
          <Table.HeadCell>เบอร์โทรศัพท์</Table.HeadCell>
          <Table.HeadCell>ความสัมพันธ์</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {contact.map((entry) => (
            <Table.Row key={entry.id}>
              <Table.Cell>{entry.name}</Table.Cell>
              <Table.Cell>{entry.tel}</Table.Cell>
              <Table.Cell>{entry.relationship}</Table.Cell>
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
                placeholder="ชื่อ-สกุล"
                value={newEntry.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                className="form-rounded-md"
                placeholder="เบอร์โทรศัพท์"
                value={newEntry.tel}
                onChange={(e) => handleInputChange("tel", e.target.value)}
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                className="form-rounded-md"
                placeholder="ความสัมพันธ์"
                value={newEntry.relationship}
                onChange={(e) =>
                  handleInputChange("relationship", e.target.value)
                }
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
  );
};

export default Contact;
