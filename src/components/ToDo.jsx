import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ToDoItem({ taskname, id, desc, assignees }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const [users, setUsers] = useState([]);
/*  useEffect(() => {
    if(assignees.length > 0) {
      // call api to get users with params id1/id2/id3
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/user/search/" + assignees.join("%7C"), {
          withCredentials: true,
        })
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch(() => {
          toast.error("Error fetching assignees");
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);*/
  return (
    <button
      className="w-full py-2 text-left top-0 px-5 rounded-[10px] bg-[#4B4B4B] shadow-navy shadow-lg"
      style={{ ...style }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <span className="text-[18px] font-semibold">{taskname}</span>
      <hr className="my-1" />
      <p>{desc}</p>
      <h1 className="mt-3">Assignees</h1>
      <div className="flex gap-2">
        {assignees?.map((as, index) => {
          if(!as) return;
          return (
            <span key={index} className="bg-purple-100 rounded-[5px] px-2 py-1 text-white">
              {as.emoticon} {as.username}
            </span>
          );
        })}
      </div>
    </button>
  );
}
