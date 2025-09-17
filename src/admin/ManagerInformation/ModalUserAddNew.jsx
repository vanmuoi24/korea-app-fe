import React, { use, useEffect, useState } from "react";
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { isMobile } from "react-device-detect";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // tiếng Việt
import { fechAllTime, submitForm } from "../../service/formAPI";
import { toast } from "react-toastify";
dayjs.locale("vi");
const ModalUserAddNew = ({
  open,
  setOpen,
  daysOfWeek,
  dataTime,
  fetchAllData,
}) => {
  const [thu, setThu] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await submitForm(values);
      if (response.data?.success) {
        toast.success("Tạo biểu mẫu thành công!");
        fetchAllData();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ModalForm
      title="➕ Tạo mới Biểu mẫu"
      open={open}
      onOpenChange={setOpen}
      modalProps={{
        maskClosable: false,
        width: isMobile ? "100%" : 900,
        okText: "Tạo mới",
        cancelText: "Hủy",
      }}
      submitTimeout={1000}
      onFinish={handleSubmit}
    >
      {/* Thứ - Ngày biểu mẫu - Ngày hẹn */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="thu"
            label="Thứ"
            placeholder="Chọn Thứ"
            options={daysOfWeek}
            fieldProps={{
              style: { width: "100%" },
              value: thu,
              onChange: (value) => setThu(value),
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>

        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngaybieumau"
            label="Ngày biểu mẫu"
            fieldProps={{
              format: "YYYY-MM-DD",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="khungGioId"
            label="Khung giờ"
            placeholder="Chọn khung giờ"
            options={[
              ...dataTime?.map((item) => ({
                label: item.khungGio,
                value: item.id,
              })),
            ]}
            fieldProps={{ style: { width: "100%" } }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>

      {/* Thông tin cá nhân */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="hoTen"
            label="Họ và tên"
            placeholder="Nhập họ tên"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormDatePicker
            name="ngaySinh"
            label="Ngày sinh"
            placeholder="Chọn ngày sinh"
            fieldProps={{ format: "YYYY-MM-DD" }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>

      {/* Giấy tờ */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="loaiGiayToXN"
            label="Loại giấy xác nhận"
            placeholder="VD: CMND, CCCD"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="loaiBangCap"
            label="Loại bằng cấp"
            placeholder="VD: Cử nhân / Kỹ sư"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>

      {/* Đơn vị cấp + Ngành */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="donViCapBang"
            label="Đơn vị cấp bằng"
            placeholder="Nhập tên trường / đơn vị cấp"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="nganhDaotao"
            label="Ngành đào tạo"
            placeholder="Nhập ngành học"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>
      {/* Bằng & Năm tốt nghiệp */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="soHieuBang"
            label="Số hiệu bằng"
            placeholder="Nhập số hiệu bằng"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormDigit
            name="namTotNghiep"
            label="Năm tốt nghiệp"
            placeholder="Nhập năm tốt nghiệp"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>
      {/* Điểm */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <ProFormDigit
            name="diemTotNghiep"
            label="Điểm tốt nghiệp"
            placeholder="Nhập điểm tốt nghiệp"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayXacNhan"
            label="Ngày xác nhận"
            fieldProps={{
              format: "YYYY-MM-DD",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayHen"
            label="Phiếu có giá trị từ ngày"
            fieldProps={{
              format: "YYYY-MM-DD",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayTao"
            label="Đến ngày"
            fieldProps={{
              format: "YYYY-MM-DD",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
export default ModalUserAddNew;
