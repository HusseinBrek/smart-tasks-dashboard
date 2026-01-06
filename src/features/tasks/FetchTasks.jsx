import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { fetchTasksByUser, selectTasksStatus } from "./tasksSlice";

export default function FetchTasks() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const status = useSelector(selectTasksStatus);

  useEffect(() => {
    if (!user) return;
    if (status === "idle") {
      dispatch(fetchTasksByUser(user.id));
    }
  }, [dispatch, user, status]);

  return null;
}
