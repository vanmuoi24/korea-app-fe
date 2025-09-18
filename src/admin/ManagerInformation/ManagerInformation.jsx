import React, { useState, useRef, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, message, DatePicker } from "antd";
import { ProTable } from "@ant-design/pro-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ModalUserAddNew from "./ModalUserAddNew";
import { deleteForm, fechAllTime, fetchForms } from "../../service/formAPI";
import ModalUserEdit from "./ModalUserEdit";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);

const ManagerInformation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataTime, setDataTime] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0);
  const navi = useNavigate();

  // state cho tìm kiếm
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchNgaySinh, setSearchNgaySinh] = useState(null);
  const [searchNgayHen, setSearchNgayHen] = useState(null);

  const tableRef = useRef();

  const daysOfWeek = [
    { label: "Chủ Nhật", value: "Chủ Nhật" },
    { label: "Thứ Hai", value: "Thứ Hai" },
    { label: "Thứ Ba", value: "Thứ Ba" },
    { label: "Thứ Tư", value: "Thứ Tư" },
    { label: "Thứ Năm", value: "Thứ Năm" },
    { label: "Thứ Sáu", value: "Thứ Sáu" },
    { label: "Thứ Bảy", value: "Thứ Bảy" },
  ];

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

  const fech = async () => {
    const res = await fechAllTime();
    if (res && res.data) {
      setDataTime(res.data.data);
    }
  };

  const hanldeView = (record) => {
    window.open(`/member/${record.id}`);
  };

  useEffect(() => {
    fetchAllData();
    fech();
  }, [currentPage, size]);

  const handleDelete = async (id) => {
    const res = await deleteForm(id);
    if (res && res.data?.success === true) {
      message.success("Xóa biểu mẫu thành công");
      fetchAllData();
    }
  };

  // 🔎 Filter
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

  // 🔹 Cột bảng
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    { title: "Họ và Tên", dataIndex: "hoTen" },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (val) =>
        val ? dayjs(val, "DD-MM-YYYY").format("DD-MM-YYYY") : "",
    },
    { title: "Email", dataIndex: "email" },
    { title: "Loại giấy tờ XN", dataIndex: "loaiGiayToXN" },
    { title: "Loại bằng cấp", dataIndex: "loaiBangCap" },
    { title: "Số hiệu bằng", dataIndex: "soHieuBang" },
    { title: "Đơn vị cấp bằng", dataIndex: "donViCapBang" },
    { title: "Ngành đào tạo", dataIndex: "nganhDaotao" },
    { title: "Năm tốt nghiệp", dataIndex: "namTotNghiep" },
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
    { title: "Khung giờ", dataIndex: ["khungGio", "khungGio"] },
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
            style={{ color: "#ffa500", fontSize: 18 }}
            onClick={() => hanldeView(record)}
          />
          <EditOutlined
            style={{ color: "#1890ff", fontSize: 18 }}
            onClick={() => {
              setOpenModalEdit(true);
              setDataEdit(record);
            }}
          />
          <Popconfirm
            title="Bạn có muốn xóa biểu mẫu này không?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Form tìm kiếm */}
      <div
        style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}
      >
        <Input
          placeholder="Nhập tên user"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: 200 }}
        />

        <DatePicker
          placeholder="Chọn ngày sinh"
          value={searchNgaySinh}
          onChange={(val) => setSearchNgaySinh(val)}
          format="DD-MM-YYYY"
        />
        <DatePicker
          placeholder="Chọn ngày hẹn"
          value={searchNgayHen}
          onChange={(val) => setSearchNgayHen(val)}
          format="DD-MM-YYYY"
        />
        <Button
          icon={<SearchOutlined />}
          type="primary"
          onClick={() => setCurrentPage(0)} // reset về trang đầu khi tìm
        >
          Tìm kiếm
        </Button>
      </div>

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
            onClick={() => setOpenModal(true)}
          >
            Thêm mới
          </Button>,
        ]}
        search={false}
        pagination={{
          current: currentPage + 1,
          pageSize: size,
          total: total,
          onChange: (page, pageSize) => {
            setCurrentPage(page - 1);
            setSize(pageSize);
          },
        }}
        dataSource={filteredData}
      />

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
