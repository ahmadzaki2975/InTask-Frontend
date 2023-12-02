import Modal from "react-modal";
import Button from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProjectModal({
  isOpen,
  setOpenModal,
  project
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  Modal.setAppElement("#__next");

  useEffect(()=>{
    if(project){
        setTitle(project.title);
        setDescription(project.description); 
    }
  },[project])

  function updateProject(e) {
    e.preventDefault();
    axios.put(process.env.NEXT_PUBLIC_API_URL + "/project/" + project.projectId, {
        title, description
    }, {
        withCredentials: true
    })
    .then((res) => {
        setOpenModal(false);
        toast.success("Project updated")
    })
    .catch((err) => {
        toast.error("An error occurred while updating project");
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11] backdrop-blur-[8px] bg-navy/30"
    >
      <div className="w-full h-full absolute top-0" onClick={() => setOpenModal(false)}></div>
      <div className="bg-navy w-[90%] md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Edit Project
        </h1>
        <form 
            onSubmit={updateProject} 
            className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4">
          <label className="flex flex-col gap-2.5">
            Project Title
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Project Description
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <Button
            text="Update"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
}
