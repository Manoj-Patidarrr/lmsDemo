import { task_controller } from "../task_controller.js";

export function taskRoute(router) {
    router
        .route("/task")
        .post(task_controller.create)
        .get(task_controller.getTask)
        .patch(task_controller.update_task)
        .delete(task_controller.delete)
        router.route("/getTaskById").get(task_controller.getTaskById);
}
