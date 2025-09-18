import React, { useEffect, useState } from "react";
import { Card, Button, Table, Space, Popconfirm, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { ModalForm, ProFormTimePicker } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { addTime, deleteTime, fechAllTime } from "../../service/formAPI";
import { toast } from "react-toastify";
import EditModel from "./EditModel";

const ManageTime = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const fech = async () => {
    const res = await fechAllTime();
    if (res && res.data) {
      setData(res.data.data);
    }
  };

  const handleAddTime = async (values) => {
    const [start, end] = values.time;

    let newTime = `${dayjs(start, "H:mm").format("H:mm")}-${dayjs(
      end,
      "H:mm"
    ).format("H:mm")}`;

    let timeData = { khungGio: newTime };

    const res = await addTime(timeData);
    if (res && res.data?.success === true) {
      message.success("Thêm khung giờ thành công");
      fech();
      return true;
    }
  };
  useEffect(() => {
    fech();
  }, []);

  const handleEdit = (record) => () => {
    setCurrentRecord(record);
    setOpenEdit(true);
  };
  // Cột bảng
  const columns = [
    {
      title: "STT",
      key: "id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Khung giờ",
      dataIndex: "khungGio",
      key: "khungGio",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record)}
            k
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = async (key) => {
    try {
      const res = await deleteTime(key.id);

      if (res && res.data?.success === true) {
        toast.success("Xóa khung giờ thành công");
        fech(); // gọi lại list
      }
    } catch (error) {
      console.error("Error deleting time slot:", error);

      if (error.response?.status === 400) {
        toast.error(
          "Xóa khung giờ thất bại: khung giờ đã được đặt trong biểu mẫu"
        );
      } else {
        toast.error("Có lỗi xảy ra khi xóa khung giờ");
      }
    }
  };

  return (
    <Card
      title={
        <span>
          <FieldTimeOutlined /> Quản lý Thời Gian
        </span>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Thêm mới
        </Button>
      }
    >
      <Table columns={columns} dataSource={data} rowKey="key" />

      {/* Modal thêm mới */}
      <ModalForm
        title="Thêm Thời Gian"
        open={open}
        onOpenChange={setOpen}
        modalProps={{ destroyOnClose: true }}
        onFinish={handleAddTime}
      >
        <ProFormTimePicker.RangePicker
          name="time"
          label="Khung giờ"
          format="H:mm"
          rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
        />
      </ModalForm>
      <EditModel
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        currentRecord={currentRecord}
        onFinish={fech}
      />
    </Card>
  );
};

export default ManageTime;
