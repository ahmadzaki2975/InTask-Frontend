import ToDoItemRow from "./ToDoItemRow";

export default function TaskTable({tasks, projectId, onEdit}){
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-center">Table & ToDoItemRow & StatusBadge</h2>
            <table className="w-[90%] bg-navy text-yellow">
            <tbody>
                <tr className="border-b border-yellow">
                <th className="text-center py-2 border-r border-yellow">No</th>
                <th className="border-r border-yellow">Title</th>
                <th className="border-r border-yellow">Assignees</th>
                <th className="border-r border-yellow">Status</th>
                <th className="w-24"></th>
                </tr>
                {tasks?.map(task => (<ToDoItemRow task={task} projectId={projectId} onSuccess={onEdit} />))}
            </tbody>
            </table>
        </div>
    )
}