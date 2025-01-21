"use client";
import React, { useEffect, useState, CSSProperties } from "react";
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
import { SubMenuType } from "@/utils/type/menuType";
interface GroupMenuSortModalProps {
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  getMenuList: () => void;
  menuList: SubMenuType[];
}

const SortableRow = ({ item }: { item: SubMenuType }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.mn_id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
    backgroundColor: isDragging ? "#f0f9ff" : "white",
    boxShadow: isDragging ? "0px 4px 12px rgba(0, 0, 0, 0.15)" : "none",
    opacity: isDragging ? 0.9 : 1,
    cursor: "move",
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TableCell>{item.mn_sort}</TableCell>
      <TableCell>{item.mn_name_th || "-"}</TableCell>
      <TableCell>{item.mn_name_en || "-"}</TableCell>
    </TableRow>
  );
};

const SubMenuSortModal: React.FC<GroupMenuSortModalProps> = ({
  isModalOpen,
  setModalOpen,
  getMenuList,
  menuList,
}) => {
  const [items, setItems] = useState<SubMenuType[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    // Sort menuList by mng_sort before setting items
    const sortedMenu = [...menuList].sort((a, b) => a.mn_sort - b.mn_sort);
    setItems(sortedMenu);
  }, [menuList]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.mn_id === active.id);
      const newIndex = items.findIndex((item) => item.mn_id === over.id);

      const updatedItems = arrayMove(items, oldIndex, newIndex);

      // Update mng_sort based on new order
      const reorderedItems = updatedItems.map((item, index) => ({
        ...item,
        mn_sort: index + 1, // Assign new sort order
      }));

      setItems(reorderedItems);
    }
  };

  const handleConfirm = async () => {
    try {
      // Loop through the items and send an update request for each
      const updateRequests = items.map((item) =>
        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/menu/${item.mn_id}`,
          {
            mn_name_en: item.mn_name_en,
            mn_name_th: item.mn_name_th,
            mn_url: item.mn_url,
            mn_sort: item.mn_sort,
            mn_is_active: 1, // 1 = ใช้งาน, 0 = ระงับ
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
      setModalOpen(false);
      getMenuList();
    } catch (error) {
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
              items={items.map((item) => item.mn_id)}
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
                    <SortableRow key={item.mn_id} item={item} />
                  ))}
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-4">
        <Button color="primary" onClick={handleConfirm}>
          {t("Confirm")}
        </Button>
        <Button color="secondary" onClick={() => setModalOpen(false)}>
          {t("Cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubMenuSortModal;
