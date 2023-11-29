import Modal from "react-modal";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateNewProjectModal({
  isOpen,
  setOpenModal,
  onClose,
  setProjectName,
  setName,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  Modal.setAppElement("#__next");

  function createProject(e) {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/project/", {
      title, description
    }, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data);
      setOpenModal(false);
    })
      .catch((err) => {
        toast.error("An error occurred while creating project");
        console.log(err);
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11]"
    >
      <div className="w-full h-full absolute top-0" onClick={() => setOpenModal(false)}></div>
      <div className="bg-navy w-[90%] md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Create Project
        </h1>
        <form onSubmit={(e) => {
          createProject(e);
        }} className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4">
          <label className="flex flex-col gap-2.5">
            Project Title
            <input
              className="outline rounded-[4px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Project Description
            <input
              className="outline rounded-[4px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <Button
            text="Create"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
}
