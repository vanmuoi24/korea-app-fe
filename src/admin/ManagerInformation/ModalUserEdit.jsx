import React, { useEffect } from "react";
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Col, Form, Row } from "antd";
import { isMobile } from "react-device-detect";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { updateForm } from "../../service/formAPI";
import { toast } from "react-toastify";

const ModalUserEdit = ({
  open,
  setOpen,
  data,
  onFinish,
  khungGioOptions,
  daysOfWeek,
  fetchAllData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        ...data,
        ngaybieumau: data.ngaybieumau ? dayjs(data.ngaybieumau) : null,
        ngaySinh: data.ngaySinh ? dayjs(data.ngaySinh) : null,
        ngayXacNhan: data.ngayXacNhan ? dayjs(data.ngayXacNhan) : null,
        ngayHen: data.ngayHen ? dayjs(data.ngayHen) : null,
        ngayTao: data.ngayTao ? dayjs(data.ngayTao) : null,
        khungGioId: data.khungGio.id || null,
        thu: data.thu ?? undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, data, form]);

  // Submit
  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      ngaybieumau: values.ngaybieumau
        ? dayjs(values.ngaybieumau).format("DD-MM-YYYY")
        : null,
      ngaySinh: values.ngaySinh
        ? dayjs(values.ngaySinh).format("DD-MM-YYYY")
        : null,
      ngayXacNhan: values.ngayXacNhan
        ? dayjs(values.ngayXacNhan).format("DD-MM-YYYY")
        : null,
      ngayHen: values.ngayHen
        ? dayjs(values.ngayHen).format("DD-MM-YYYY")
        : null,
      ngayTao: values.ngayTao
        ? dayjs(values.ngayTao).format("DD-MM-YYYY")
        : null,
      khungGioId: values.khungGioId ?? data.khungGioId,
      thu: values.thu ?? data.thu,
    };

    const res = await updateForm(data.id, formattedValues);
    if (res && res.data?.success === true) {
      toast.success("Cập nhật biểu mẫu thành công");
      fetchAllData();
      setOpen(false);
    }
  };

  return (
    <ModalForm
      title="Sửa Biểu mẫu"
      open={open}
      onOpenChange={setOpen}
      form={form}
      modalProps={{
        maskClosable: false,
        width: isMobile ? "100%" : 900,
        okText: "Lưu",
        cancelText: "Hủy",
        destroyOnClose: true,
      }}
      submitTimeout={1000}
      onFinish={handleSubmit}
    >
      {/* Thứ - Ngày biểu mẫu - Khung giờ */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="thu"
            label="Thứ"
            placeholder="Chọn Thứ"
            options={daysOfWeek}
            fieldProps={{
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>

        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngaybieumau"
            label="Ngày biểu mẫu"
            fieldProps={{ format: "DD-MM-YYYY", style: { width: "100%" } }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>

        <Col xs={24} sm={8}>
          <ProFormSelect
            name="khungGioId"
            label="Khung giờ"
            placeholder="Chọn khung giờ"
            options={[
              ...khungGioOptions?.map((item) => ({
                label: item.khungGio,
                value: item.id,
              })),
            ]}
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
            fieldProps={{ format: "DD-MM-YYYY" }}
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

      {/* Ngày xác nhận & Hẹn */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayXacNhan"
            label="Ngày xác nhận"
            fieldProps={{ format: "DD-MM-YYYY", style: { width: "100%" } }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayHen"
            label="Phiếu có giá trị từ ngày"
            fieldProps={{ format: "DD-MM-YYYY", style: { width: "100%" } }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayTao"
            label="Đến ngày"
            fieldProps={{ format: "DD-MM-YYYY", style: { width: "100%" } }}
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default ModalUserEdit;
