import React from "react";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACK_PORT } from "../../var";
import Swal from "sweetalert2";
import LogIn from "./LogIn";

function SignInModal() {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(<LogIn />);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Sign In
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}

export default SignInModal;
