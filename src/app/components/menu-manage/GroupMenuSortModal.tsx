"use client";
import React, { useEffect, useState, CSSProperties } from "react";
import {
  errorToast,
  successCreateToast,
  successUpdateToast,
} from "@/utils/toast";

import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import { t } from "i18next";
import axios from "axios";

interface MenuType {
  mng_id: string;
  mng_name_th: string;
  mng_name_en: string;
  mng_sort: number;
  mng_icon: string;
}

interface GroupMenuSortModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  getMenuList: () => void;
  menuList: MenuType[];
}

const SortableRow = ({ item }: { item: MenuType }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.mng_id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    backgroundColor: isDragging ? "primary" : "white",

    boxShadow: isDragging ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : "none",
    opacity: isDragging ? 0.9 : 1,
    cursor: "move",
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
      {...attributes}
      {...listeners}
    >
      <TableCell>{item.mng_sort}</TableCell>
      <TableCell>{item.mng_name_th || "-"}</TableCell>
      <TableCell>{item.mng_name_en || "-"}</TableCell>
    </TableRow>
  );
};

const GroupMenuSortModal: React.FC<GroupMenuSortModalProps> = ({
  isModalOpen,
  setModalOpen,
  getMenuList,
  menuList,
}) => {
  const [items, setItems] = useState<MenuType[]>([]);
  const [dataList, setDataList] = useState<MenuType[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const getData = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/pagination/${process.env.NEXT_PUBLIC_AP_ID}`,
      {
        search_text: "",
        search_status: -1,
        page: 1,
        limit: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (res.data.status === "success") {
      setDataList(res.data.data.items);
    } else {
      errorToast(res.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Sort menuList by mng_sort before setting items
    const sortedMenu = [...dataList].sort((a, b) => a.mng_sort - b.mng_sort);
    setItems(sortedMenu);
  }, [dataList]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.mng_id === active.id);
      const newIndex = items.findIndex((item) => item.mng_id === over.id);

      const updatedItems = arrayMove(items, oldIndex, newIndex);

      // Update mng_sort based on new order
      const reorderedItems = updatedItems.map((item, index) => ({
        ...item,
        mng_sort: index + 1, // Assign new sort order
      }));

      setItems(reorderedItems);
    }
  };

  const handleConfirm = async () => {
    try {
      // Loop through the items and send an update request for each
      const updateRequests = items.map((item) =>
        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/${item.mng_id}`,
          {
            mng_name_en: item.mng_name_en,
            mng_name_th: item.mng_name_th,
            mng_icon: item.mng_icon,
            mng_sort: item.mng_sort,
            mng_status: 1, // 1 = ใช้งาน, 0 = ระงับ
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
      );

      // Wait for all API calls to complete
      await Promise.all(updateRequests);

      console.log("Updated Order with mng_sort:", items);

      // Optionally close the modal and refresh the list
      successUpdateToast();
      setModalOpen(false);
      getMenuList();
    } catch (error) {
      errorToast("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
      console.error("Error updating menu order:", error);
    }
  };

  return (
    <Modal
      show={isModalOpen}
      size="2xl"
      onClose={() => setModalOpen(false)}
      className="w-full"
    >
      <Modal.Header className="bg-primary rounded-t-lg text-white">
        {t("Sort Group Menu")}
      </Modal.Header>
      <Modal.Body>
        <div className="border rounded-md border-ld">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.mng_id)}
              strategy={verticalListSortingStrategy}
            >
              <Table>
                <TableHead>
                  <TableHeadCell>{t("Order")}</TableHeadCell>
                  <TableHeadCell>{t("Group Name (th)")}</TableHeadCell>
                  <TableHeadCell>{t("Group Name (en)")}</TableHeadCell>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <SortableRow key={item.mng_id} item={item} />
                  ))}
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-row justify-end  gap-4">
        <div className="flex flex-row justify-end  gap-4">
          <Button color="primary" onClick={handleConfirm}>
            {t("Confirm")}
          </Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            {t("Cancel")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupMenuSortModal;
