import React, { useEffect, useRef, useState } from "react";
import { ModalForm, ProFormTimePicker } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { message } from "antd";
import { updateTime } from "../../service/formAPI";

const EditModel = ({ openEdit, setOpenEdit, currentRecord, onFinish }) => {
  const formRef = useRef();
  const [initValues, setInitValues] = useState({}); // lưu giá trị khởi tạo

  // parse "08:00-10:00" thành [dayjs, dayjs]
  const parseRange = (rangeStr) => {
    if (!rangeStr) return [];
    const parts = rangeStr.split("-");
    if (parts.length === 2) {
      const start = dayjs(parts[0], "H:mm"); // cho phép "8:00" hoặc "08:00"
      const end = dayjs(parts[1], "H:mm");
      return [start, end];
    }
    return [];
  };

  // Fill khi mở modal
  useEffect(() => {
    if (openEdit) {
      if (currentRecord?.khungGio) {
        const vals = parseRange(currentRecord.khungGio);
        if (vals.length !== 2 || !vals[0].isValid() || !vals[1].isValid()) {
          message.warning("Không parse được giờ, vui lòng chỉnh lại.");
        }
        setInitValues({ time: vals }); // set initialValues để đảm bảo fill được
      } else {
        setInitValues({});
      }
    }
  }, [openEdit, currentRecord]);

  // Submit → trả về chuỗi
  const handleEdit = async (values) => {
    const [start, end] = values.time;

    let newTime = `${dayjs(start, "H:mm").format("H:mm")}-${dayjs(
      end,
      "H:mm"
    ).format("H:mm")}`;

    let timeData = { id: currentRecord.id, khungGio: newTime };

    const res = await updateTime(timeData);
    if (res && res.data?.success === true) {
      message.success("Cập nhật khung giờ thành công");
      onFinish();
      return true;
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      title="Sửa Thời Gian"
      open={openEdit}
      onOpenChange={setOpenEdit}
      modalProps={{ destroyOnClose: true }}
      onFinish={handleEdit}
      initialValues={initValues} // 👈 thêm chỗ này
    >
      <ProFormTimePicker.RangePicker
        name="time"
        label="Khung giờ"
        format="HH:mm"
        rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
      />
    </ModalForm>
  );
};

export default EditModel;
