import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function ToDoItem({ taskname, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <button 
      className="w-full py-2 text-left top-0 px-5 rounded-[10px] bg-[#4B4B4B] shadow-navy shadow-lg"
      style={{ ...style }}
      ref={setNodeRef} 
      {...listeners} 
      {...attributes}>
      <span style = {{ fontSize:"16px", fontWeight:"regular", color: "#D6D5A8" }}>{taskname}</span>
    </button>
  );
}