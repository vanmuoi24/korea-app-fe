// ================================
// IMPORTS
// ================================
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Ant Design Components
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, message, DatePicker } from "antd";
import { ProTable } from "@ant-design/pro-components";

// Third-party Libraries
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Local Components
import ModalUserAddNew from "./ModalUserAddNew";
import ModalUserEdit from "./ModalUserEdit";

// Services
import { deleteForm, fechAllTime, fetchForms } from "../../service/formAPI";
import { toast } from "react-toastify";

// ================================
// CONFIGURATION
// ================================
dayjs.extend(customParseFormat);

const ManagerInformation = () => {
  // ================================
  // HOOKS & STATE
  // ================================
  const navigate = useNavigate();
  const tableRef = useRef();

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  // Data states
  const [data, setData] = useState([]);
  const [dataTime, setDataTime] = useState([]);
  const [total, setTotal] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(5);

  // Search states
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchNgaySinh, setSearchNgaySinh] = useState(null);
  const [searchNgayHen, setSearchNgayHen] = useState(null);

  // ================================
  // CONSTANTS
  // ================================
  const daysOfWeek = [
    { label: "Chủ Nhật", value: "Chủ Nhật" },
    { label: "Thứ Hai", value: "Thứ Hai" },
    { label: "Thứ Ba", value: "Thứ Ba" },
    { label: "Thứ Tư", value: "Thứ Tư" },
    { label: "Thứ Năm", value: "Thứ Năm" },
    { label: "Thứ Sáu", value: "Thứ Sáu" },
    { label: "Thứ Bảy", value: "Thứ Bảy" },
  ];

  // ================================
  // API FUNCTIONS
  // ================================
  const fetchAllData = async () => {
    try {
      const response = await fetchForms();
      if (response.data?.success === true) {
        setData(response.data.data);
        setTotal(response.data.data.length); // nếu BE chưa trả total
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const fetchTimeData = async () => {
    try {
      const res = await fechAllTime();
      if (res && res.data) {
        setDataTime(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching time data:", error);
    }
  };

  // ================================
  // EVENT HANDLERS
  // ================================
  const handleView = (record) => {
    window.open(`/member/${record.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteForm(id);
      if (res && res.data?.success === true) {
        toast.success("Xóa biểu mẫu thành công");
        fetchAllData();
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Có lỗi xảy ra khi xóa biểu mẫu");
    }
  };

  const handleEdit = (record) => {
    setDataEdit(record);
    setOpenModalEdit(true);
  };

  const handleAddNew = () => {
    setOpenModal(true);
  };

  // ================================
  // EFFECTS
  // ================================
  useEffect(() => {
    fetchAllData();
    fetchTimeData();
  }, [currentPage, size]);

  // ================================
  // DATA FILTERING
  // ================================
  const filteredData = data.filter((item) => {
    const matchName = searchName
      ? item.hoTen?.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const matchEmail = searchEmail
      ? item.email?.toLowerCase().includes(searchEmail.toLowerCase())
      : true;
    const matchNgaySinh = searchNgaySinh
      ? dayjs(item.ngaySinh, "DD-MM-YYYY").isSame(searchNgaySinh, "day")
      : true;
    const matchNgayHen = searchNgayHen
      ? dayjs(item.ngayHen, "DD-MM-YYYY").isSame(searchNgayHen, "day")
      : true;

    return matchName && matchEmail && matchNgaySinh && matchNgayHen;
  });

  // ================================
  // TABLE COLUMNS CONFIGURATION
  // ================================
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ và Tên",
      dataIndex: "hoTen",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (val) =>
        val ? dayjs(val, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "Loại giấy tờ XN",
      dataIndex: "loaiGiayToXN",
    },
    {
      title: "Loại bằng cấp",
      dataIndex: "loaiBangCap",
    },
    {
      title: "Số hiệu bằng",
      dataIndex: "soHieuBang",
    },
    {
      title: "Đơn vị cấp bằng",
      dataIndex: "donViCapBang",
    },
    {
      title: "Ngành đào tạo",
      dataIndex: "nganhDaotao",
    },
    {
      title: "Năm tốt nghiệp",
      dataIndex: "namTotNghiep",
    },
    {
      title: "Điểm tốt nghiệp",
      dataIndex: "diemTotNghiep",
      render: (val) => (val !== undefined ? val.toFixed(2) : ""),
    },
    {
      title: "Ngày hẹn",
      dataIndex: "ngayHen",
      render: (val) =>
        val ? dayjs(val, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "Khung giờ",
      dataIndex: ["khungGio", "khungGio"],
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      render: (val) =>
        val ? dayjs(val, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "Ngày xác nhận",
      dataIndex: "ngayXacNhan",
      render: (val) =>
        val ? dayjs(val, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <EyeOutlined
            style={{ color: "#ffa500", fontSize: 18, cursor: "pointer" }}
            onClick={() => handleView(record)}
            title="Xem chi tiết"
          />
          <EditOutlined
            style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn có muốn xóa biểu mẫu này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <DeleteOutlined
              style={{ color: "#ff4d4f", fontSize: 18, cursor: "pointer" }}
              title="Xóa"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ================================
  // RENDER
  // ================================
  return (
    <div>
      {/* Search Form */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Nhập tên user"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />

        <DatePicker
          placeholder="Chọn ngày sinh"
          value={searchNgaySinh}
          onChange={(val) => setSearchNgaySinh(val)}
          format="DD-MM-YYYY"
          style={{ width: 200 }}
        />

        <DatePicker
          placeholder="Chọn ngày hẹn"
          value={searchNgayHen}
          onChange={(val) => setSearchNgayHen(val)}
          format="DD-MM-YYYY"
          style={{ width: 200 }}
        />

        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => setCurrentPage(0)}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Data Table */}
      <ProTable
        columns={columns}
        actionRef={tableRef}
        rowKey="id"
        headerTitle="Danh sách biểu mẫu"
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
            Thêm mới
          </Button>,
        ]}
        search={false}
        pagination={{
          current: currentPage + 1,
          pageSize: size,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} mục`,
          onChange: (page, pageSize) => {
            setCurrentPage(page - 1);
            setSize(pageSize);
          },
        }}
        dataSource={filteredData}
        scroll={{ x: 1500 }}
      />

      {/* Modals */}
      <ModalUserAddNew
        setOpen={setOpenModal}
        open={openModal}
        fetchAllData={fetchAllData}
        daysOfWeek={daysOfWeek}
        dataTime={dataTime}
      />

      <ModalUserEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        data={dataEdit}
        fetchAllData={fetchAllData}
        daysOfWeek={daysOfWeek}
        khungGioOptions={dataTime}
      />
    </div>
  );
};

export default ManagerInformation;
