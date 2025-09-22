import React, { useEffect, useState } from "react";

import logo from "./logo.png";
import { useParams } from "react-router-dom";
import { viewFromDetail } from "../../service/formAPI";
import { color } from "framer-motion";

const Home = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const fectData = async () => {
    const res = await viewFromDetail(id);
    if (res && res.data && res.data?.data && res.data.success === true) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    fectData();
  }, []);
  return (
    <div>
      <div id="page-wrap" style={{ color: "black" }}>
        <table
          style={{
            width: "100%",
            border: "0px solid !important",
            color: "black",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "0px solid",
                  height: "70px",
                }}
              >
                <img src={logo} alt="Logo" />
              </td>

              <td>
                <img
                  src={`https://deloy-fe-5.onrender.com/api/bieumau/${id}/qr`}
                  alt="QR Code"
                  style={{ width: 168, height: 168, marginLeft: "50px" }}
                />
              </td>

              <td
                id="thongtinphieuthu"
                style={{
                  border: "0px solid",
                  textAlign: "right",
                }}
              >
                <a
                  className="btn btn-primary"
                  style={{ fontSize: "14px" }}
                  target="_blank"
                  id="printButton1"
                  rel="noreferrer"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print" style={{ fontSize: "12px" }}></i>{" "}
                  Print
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ margin: "10px 1px 10px 1px" }}></p>
        <span style={{ fontSize: "18px", lineHeight: "1.5" }}>
          {" "}
          Hẹn nộp tại Đại sứ quán Hàn Quốc tại Việt Nam (Khu Ngoại giao đoàn,
          Bắc Từ Liêm, Hà Nội)
        </span>
        <p style={{ margin: "20px 0 25px 0" }}></p>
        <h3
          className="btn btn-default btn-lg no-outline"
          style={{ fontSize: "20px", color: "black" }}
        >
          {data.thu}, ngày {data.ngaybieumau}, Khung giờ từ{" "}
          {data.khungGio?.khungGio}
        </h3>

        <p style={{ margin: "25px 10px 25px 10px" }}></p>
        <h2
          style={{ textAlign: "center", lineHeight: "1.5", fontSize: "30px" }}
        >
          CIEC Code: <strong>{data.maICD}</strong>
        </h2>
        <p style={{ margin: "35px 10px 22px 10px" }}></p>

        <table className="table table-th-block ">
          <tbody>
            <tr>
              <td style={{ width: "40%" }}>Họ và tên:</td>
              <td>{data.hoTen}</td>
            </tr>
            <tr>
              <td>Ngày sinh:</td>
              <td>{data.ngaySinh}</td>
            </tr>
            <tr>
              <td>Loại giấy tờ XN:</td>
              <td>
                <strong>{data.loaiGiayToXN}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table table-th-block cap ">
          <thead>
            <tr>
              <th style={{ width: "40%" }} id="math3">
                Loại bằng cấp:
              </th>
              <th>
                <span className="caodang" id="math4">
                  {data.loaiBangCap}
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Đơn vị cấp bằng:</td>
              <td>{data.donViCapBang}</td>
            </tr>
            <tr>
              <td>Ngành đào tạo:</td>
              <td>{data.nganhDaotao}</td>
            </tr>
            <tr>
              <td>Ghi chú:</td>
              <td>{data.ghiChu}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-th-block bang ">
          <thead>
            <tr style={{ background: "#37BC9B", color: "#fff" }}>
              <th style={{ width: "40%" }}>&nbsp;</th>
              <th id="math1">Bằng tốt nghiệp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Số hiệu bằng:</td>
              <td>{data.soHieuBang}</td>
            </tr>
            <tr>
              <td>Năm tốt nghiệp:</td>
              <td>{data.namTotNghiep}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-th-block diem ">
          <thead>
            <tr style={{ background: "#37BC9B", color: "#fff" }}>
              <th style={{ width: "40%" }}>&nbsp;</th>
              <th id="math">Bảng điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mã SV/HV:</td>
              <td>{data.maSV}</td>
            </tr>
            <tr>
              <td>Điểm tốt nghiệp/Điểm xếp loại:</td>
              <td>
                {
                  data.diemTotNghiep &&
                    (data.diemTotNghiep >= 1 && data.diemTotNghiep <= 6
                      ? data.diemTotNghiep.toFixed(1) // thêm .0
                      : data.diemTotNghiep.toString()) // giữ nguyên
                }
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Thang điểm: {data.thangDiem}
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ margin: "25px 10px 27px 10px" }}></p>
        <table className="table table-th-block" style={{ marginTop: "40px" }}>
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Ngày xác nhận: {data.ngayXacNhan}
              </td>

              <td
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                <span
                  style={{
                    marginLeft: 0,
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                  id="math5"
                >
                  &nbsp;&nbsp; Kết quả xác minh:
                  <b className="mx-2 math5" style={{ color: "#37BC9B" }}>
                    Chính xác
                  </b>
                </span>
              </td>
            </tr>
            <tr>
              <td
                colSpan="2"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Phiếu có giá trị từ ngày: <span>{data.ngayHen}</span> đến ngày{" "}
                <span>{data.ngayTao}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <span
            className="outline-none my-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tra cứu tại:
            https://korea.ciec.vn/member/print-new-2025/5a383c5a13590fbe346df1d4e7921f95/3/
          </span>
        </div>

        <div className="info-box">
          <p className="info-note">
            * Thông tin tại biểu này được dùng để Nộp đăng ký xác nhận lãnh sự
            bằng cấp tại Đại sứ quán Hàn Quốc tại Việt Nam.
          </p>
          <em>
            Nếu cần thêm thông tin, liên hệ Số điện thoại{" "}
            <b>024.3886.6868 máy lẻ 111</b> hoặc email <b>korea@ciec.vn</b>
          </em>
        </div>

        <p>&nbsp;</p>
        <div style={{ clear: "both" }}>&nbsp;</div>
        <a
          href="https://korea.ciec.vn/"
          id="backlink"
          className="my-link outline-none text-decoration-none "
        >
          <i className="fa fa-home"></i> Trang chủ
        </a>
      </div>
    </div>
  );
};

export default Home;
