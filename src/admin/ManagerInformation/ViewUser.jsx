"use client";

import { Badge, Descriptions, Drawer } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { fetchForms } from "../../service/formAPI";

const ViewDetailUser = ({ open, setOpen, data }) => {
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <Drawer
      title="Thông Tin Biểu Mẫu"
      placement="right"
      open={open} // sử dụng state
      width={"40vw"}
      maskClosable={false}
      onClose={() => setOpen(false)}
    >
      <Descriptions bordered column={2} layout="vertical">
        <Descriptions.Item label="Tên hiển thị">{data?.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Giới Tính">
          {data?.gender === "MALE"
            ? "Nam"
            : data?.gender === "FEMALE"
            ? "Nữ"
            : "Khác"}
        </Descriptions.Item>
        <Descriptions.Item label="Tuổi">{data?.age}</Descriptions.Item>
        <Descriptions.Item label="Vai trò">
          <Badge status="processing" text={data?.role?.name || "Chưa có"} />
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {data?.createdDate
            ? dayjs(data.createdDate).format("DD-MM-YYYY HH:mm:ss")
            : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sửa">
          {data?.updatedDate
            ? dayjs(data.updatedDate).format("DD-MM-YYYY HH:mm:ss")
            : ""}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ViewDetailUser;
