import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../redux/constants/DrawerConstants";

export default function DrawerHOC(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.DrawerReducer);

  const dispatch = useDispatch();

  const showDrawer = () => {
    // setOpen(true);
    dispatch({
      type: "OPEN_DRAWER",
      // visible: true,
    });
  };

  const onClose = () => {
    // setOpen(false);
    dispatch({
      type: CLOSE_DRAWER,
      // visible: false,
    });
  };

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    New account
  </Button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={visible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {/* Nội dung thay đổi của Drawer */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
