// ================================
// IMPORTS
// ================================
import React, { useEffect } from "react";
import { Col, Form, Row, Divider } from "antd";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

// Ant Design Pro Components
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";

// Third-party Libraries
import dayjs from "dayjs";
import "dayjs/locale/vi";

// Services
import { updateForm } from "../../service/formAPI";

// ================================
// CONFIGURATION
// ================================
dayjs.locale("vi");

const ModalUserEdit = ({
  open,
  setOpen,
  data,
  onFinish,
  khungGioOptions,
  daysOfWeek,
  fetchAllData,
}) => {
  // ================================
  // HOOKS & STATE
  // ================================
  const [form] = Form.useForm();

  // ================================
  // EFFECTS
  // ================================
  useEffect(() => {
    if (open && data) {
      console.log(data);
      form.setFieldsValue({
        ...data,
        ngaybieumau: data.ngaybieumau
          ? dayjs(data.ngaybieumau, "DD-MM-YYYY")
          : null,
        ngaySinh: data.ngaySinh ? dayjs(data.ngaySinh, "DD-MM-YYYY") : null,
        ngayXacNhan: data.ngayXacNhan
          ? dayjs(data.ngayXacNhan, "DD-MM-YYYY")
          : null,
        ngayHen: data.ngayHen ? dayjs(data.ngayHen, "DD-MM-YYYY") : null,
        ngayTao: data.ngayTao ? dayjs(data.ngayTao, "DD-MM-YYYY") : null,
        khungGioId: data.khungGio?.id || null,
        maICD: data.maICD ?? undefined,
        ghiChu: data.ghiChu ?? undefined,
        maSV: data.maSV ?? undefined,
        thu: data.thu ?? undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, data, form]);

  // ================================
  // EVENT HANDLERS
  // ================================
  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        ngaybieumau: values.ngaybieumau,
        thangDiemg: values.thangDiem,
        ngaySinh: values.ngaySinh,
        ngayXacNhan: values.ngayXacNhan,
        ngayHen: values.ngayHen,

        ngayTao: values.ngayTao,

        khungGioId: values.khungGioId ?? data.khungGioId,
        thu: values.thu ?? data.thu,
        maICD: values.maICD ?? data.maICD,
        ghiChu: values.ghiChu ?? data.ghiChu,
        maSV: values.maSV ?? data.maSV,
      };

      const res = await updateForm(data.id, formattedValues);
      if (res && res.data?.success === true) {
        toast.success("Cập nhật biểu mẫu thành công");
        fetchAllData();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating form:", error);
      toast.error("Có lỗi xảy ra khi cập nhật biểu mẫu!");
    }
  };

  // ================================
  // RENDER
  // ================================
  return (
    <ModalForm
      title="✏️ Chỉnh sửa Biểu mẫu"
      open={open}
      onOpenChange={setOpen}
      form={form}
      modalProps={{
        maskClosable: false,
        width: isMobile ? "100%" : 1000,
        okText: "Lưu thay đổi",
        cancelText: "Hủy",
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={handleSubmit}
    >
      {/* ================================
          THÔNG TIN LỊCH HẸN
          ================================ */}
      <Divider orientation="left" orientationMargin="0">
        📅 Thông tin lịch hẹn
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="thu"
            label="Thứ"
            placeholder="Chọn thứ"
            options={daysOfWeek}
            fieldProps={{
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn thứ" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngaybieumau"
            label="Ngày biểu mẫu"
            placeholder="Chọn ngày biểu mẫu"
            fieldProps={{
              format: "DD-MM-YYYY",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn ngày biểu mẫu" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="khungGioId"
            label="Khung giờ"
            placeholder="Chọn khung giờ"
            options={
              khungGioOptions?.map((item) => ({
                label: item.khungGio,
                value: item.id,
              })) || []
            }
            fieldProps={{ style: { width: "100%" } }}
            rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
          />
        </Col>
      </Row>

      {/* ================================
          THÔNG TIN CÁ NHÂN
          ================================ */}
      <Divider orientation="left" orientationMargin="0">
        👤 Thông tin cá nhân
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="hoTen"
            label="Họ và tên"
            placeholder="Nhập họ và tên đầy đủ"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên" },
              { min: 2, message: "Họ tên phải có ít nhất 2 ký tự" },
            ]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormDatePicker
            name="ngaySinh"
            label="Ngày sinh"
            placeholder="Chọn ngày sinh"
            fieldProps={{
              format: "DD-MM-YYYY",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="maICD"
            label="Mã ID"
            placeholder="Nhập mã ID"
            rules={[{ required: true, message: "Vui lòng nhập mã ID" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="maSV"
            label="Mã sinh viên"
            placeholder="Nhập mã sinh viên"
            rules={[{ required: true, message: "Vui lòng nhập mã sinh viên" }]}
          />
        </Col>
      </Row>

      {/* ================================
          THÔNG TIN BẰNG CẤP
          ================================ */}
      <Divider orientation="left" orientationMargin="0">
        🎓 Thông tin bằng cấp
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="loaiBangCap"
            label="Loại bằng cấp"
            placeholder="VD: Cử nhân, Kỹ sư, Thạc sĩ"
            rules={[{ required: true, message: "Vui lòng nhập loại bằng cấp" }]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="soHieuBang"
            label="Số hiệu bằng"
            placeholder="Nhập số hiệu bằng"
            rules={[{ required: true, message: "Vui lòng nhập số hiệu bằng" }]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="donViCapBang"
            label="Đơn vị cấp bằng"
            placeholder="Nhập tên trường/đơn vị cấp bằng"
            rules={[
              { required: true, message: "Vui lòng nhập đơn vị cấp bằng" },
            ]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="nganhDaotao"
            label="Ngành đào tạo"
            placeholder="Nhập ngành học"
            rules={[{ required: true, message: "Vui lòng nhập ngành đào tạo" }]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <ProFormDigit
            name="namTotNghiep"
            label="Năm tốt nghiệp"
            placeholder="Nhập năm tốt nghiệp"
            rules={[
              { required: true, message: "Vui lòng nhập năm tốt nghiệp" },
            ]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDigit
            name="diemTotNghiep"
            label="Điểm tốt nghiệp"
            placeholder="Nhập điểm tốt nghiệp"
            rules={[
              { required: true, message: "Vui lòng nhập điểm tốt nghiệp" },
            ]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormText
            name="thangDiem"
            label="Thang Điểm"
            placeholder="Nhập ngành học"
            rules={[{ required: true, message: "Vui lòng nhập thang điểm" }]}
          />
        </Col>
      </Row>

      {/* ================================
          GIẤY TỜ VÀ XÁC NHẬN
          ================================ */}
      <Divider orientation="left" orientationMargin="0">
        📄 Giấy tờ và xác nhận
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="loaiGiayToXN"
            label="Loại giấy xác nhận"
            placeholder="VD: CMND, CCCD, Hộ chiếu"
            rules={[
              { required: true, message: "Vui lòng nhập loại giấy xác nhận" },
            ]}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="ghiChu"
            label="Ghi chú"
            placeholder="Nhập ghi chú (nếu có)"
            rules={[{ required: false, message: "Vui lòng nhập ghi chú" }]}
          />
        </Col>
      </Row>

      {/* ================================
          NGÀY THÁNG QUAN TRỌNG
          ================================ */}
      <Divider orientation="left" orientationMargin="0">
        📆 Ngày tháng quan trọng
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayXacNhan"
            label="Ngày xác nhận"
            placeholder="Chọn ngày xác nhận"
            fieldProps={{
              format: "DD-MM-YYYY",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn ngày xác nhận" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayHen"
            label="Phiếu có giá trị từ ngày"
            placeholder="Chọn ngày bắt đầu"
            fieldProps={{
              format: "DD-MM-YYYY",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormDatePicker
            name="ngayTao"
            label="Đến ngày"
            placeholder="Chọn ngày kết thúc"
            fieldProps={{
              format: "DD-MM-YYYY",
              style: { width: "100%" },
            }}
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default ModalUserEdit;
