import Modal from "react-modal";
import Button from "../Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewTaskModal({
  isOpen,
  setOpenModal,
  id,
  onClose,
  initialStatus,
  assigneesOptions,
}) {
  Modal.setAppElement("#__next");
  const [assignees, setAssignees] = useState(assigneesOptions || []);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
    setAssignees(assigneesOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const postNewTask = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/project/" + id + "/tasks",
        {
          name,
          description,
          assignees: selectedAssignees,
          status: status.toLowerCase(),
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("New Task Created");
        setOpenModal(false);
        setName("");
        setDescription("");
        setStatus("ToDo");
        setSelectedAssignees([]);
        setAssignees(assigneesOptions);
        onClose();
      })
      .catch((e) => {
        toast.error("error " + e.message);
        // console.log(e);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      // onClose={onClose}
      className="w-screen h-screen flex justify-center items-center rounded-[10px] absolute !z-[11] backdrop-blur-[8px] bg-navy/30"
    >
      <div
        className="w-full h-full absolute top-0"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="bg-navy w-[90%] max-h-[90vh] overflow-y-auto md:w-1/2 md:max-w-[600px] lg:max-w-[800px] p-8 rounded-[10px] relative z-[10]">
        <h1 className="text-yellow text-[32px] font-semibold text-center">
          Create Task
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postNewTask();
          }}
          className="bg-yellow p-8 rounded-[5px] text-[20px] flex flex-col gap-4"
        >
          <label className="flex flex-col gap-2.5">
            Task Name
            <input
              className="focus:outline px-2 py-1 rounded-[4px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Description
            <textarea
              className="focus:outline px-2 py-1 rounded-[4px] max-h-[200px] min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2.5">
            Task Status
            <div
              className="bg-navy w-full rounded-[4px] relative cursor-pointer select-none"
              onClick={() => {
                setOpenDropdown(!openDropdown);
              }}
            >
              {status && (
                <p
                  className={
                    "px-2 py-1 " +
                    (status.toLowerCase() === "todo"
                      ? " outline-green outline outline-[0.2px] bg-[rgba(94,238,126,0.15)] text-green"
                      : "") +
                    (status.toLowerCase() === "ongoing"
                      ? " outline-[#A3E9FF] outline outline-[0.2px] bg-[rgba(163,233,255,0.15)] text-[#94FFFF]"
                      : "") +
                    (status.toLowerCase() === "done"
                      ? " outline-[#D2C5FF] outline outline-[0.2px] bg-[rgba(150,119,255,0.15)] text-[#D2C5FF]"
                      : "")
                  }
                >
                  {status.toLowerCase() === "todo" && "To Do"}
                  {status.toLowerCase() === "ongoing" && "Doing"}
                  {status.toLowerCase() === "done" && "Done"}
                </p>
              )}
              <div
                className={
                  "bg-white shadow-[0_0_5px_rgba(0,0,0,.6)] rounded-[5px] absolute top-[calc(100%+10px)] left-0 " +
                  (openDropdown ? "" : "hidden")
                }
              >
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("ToDo")}
                >
                  ToDo
                </p>
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("ongoing")}
                >
                  Doing
                </p>
                <p
                  className="hover:bg-navy/10 px-5 py-2 cursor-pointer "
                  onClick={() => setStatus("Done")}
                >
                  Done
                </p>
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-2.5">
            <div>
              Assignees
              <div className="flex gap-3 flex-wrap mt-1">
                {assignees?.map((assignee, index) => {
                  return (
                    <AssigneeOption
                      key={assignee}
                      assignee={assignee}
                      setSelectedAssignees={setSelectedAssignees}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </label>
          <Button text="Create" type="submit" />
        </form>
      </div>
    </Modal>
  );
}

function AssigneeOption({ assignee, setSelectedAssignees }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={
        "rounded-[5px] py-1 bg-purple-100 px-2 text-white flex gap-2 cursor-pointer " +
        (selected
          ? " outline outline-2 outline-offset-2 outline-purple-100"
          : "")
      }
      key={assignee}
      onClick={() => {
        setSelected(!selected);
        setSelectedAssignees((prev) => {
          if (selected) {
            return prev.filter((p) => p !== assignee);
          } else {
            return [...prev, assignee];
          }
        });
      }}
    >
      <span>{assignee}</span>
    </div>
  );
}
