import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import {
    Row,
    Col,
    Spinner,
    Button,
    Form,
    ToggleButtonGroup,
    ToggleButton,
    Alert,
} from "react-bootstrap";

import Task from "../components/tasks/Task";
import TaskForm from "../components/tasks/TaskForm";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [taskStatus, setTaskStatus] = useState("all");
    const [totalRecords, setTotalRecords] = useState(0);

    const [addTask, setAddTask] = useState(false);

    const taskStatusChangeHandler = (value) => {
        setTaskStatus(value);
        fetchTasks({ taskStatus: value });
    };

    const addTaskHandler = () => {
        setAddTask(true);
    };

    const taskFormCloseHandler = () => {
        setAddTask(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = (params = {}) => {
        const formParams = {
            taskStatus: taskStatus,
            sortBy: "createdAt:asc",
            perPage: 5,
            currentPage: 1,
            ...params,
        };

        let completed = null;
        if (formParams.taskStatus === "complete") {
            completed = true;
        } else if (formParams.taskStatus === "incomplete") {
            completed = false;
        }

        const formData = {
            completed: completed,
            sortBy: formParams.sortBy,
            per_page: formParams.perPage,
            current_page: formParams.currentPage,
        };

        setLoading(true);
        axios
            .get("/tasks", {
                params: formData,
            })
            .then((res) => {
                setTasks(res.data.tasks);
                setTotalRecords(res.data.pagination.total_records);
                setErrorMessage(null);

                // if(this.current_page > 1 && this.tasks.length == 0) {
                //     this.current_page = 1
                //     this.fetchTasks()
                // }
            })
            .catch((error) => {
                let message = "Something went wrong";
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    message = error.response.data.message;
                }
                setErrorMessage(message);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <Row>
            <Col sm={12}>
                <h1 className="float-left">Tasks</h1>
                {loading && (
                    <div className="float-left ml-2 mt-3">
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}
                <Button
                    variant="primary"
                    className="float-right my-2"
                    onClick={addTaskHandler}
                >
                    Add Task
                </Button>
            </Col>
            <div className="clear-fix"></div>

            <Col sm={12}>
                <div className="float-left">
                    <Form.Group controlId="taskStatus">
                        <Form.Label>Task status:</Form.Label>
                        <div>
                            <ToggleButtonGroup
                                type="radio"
                                name="options"
                                value={taskStatus}
                                onChange={taskStatusChangeHandler}
                            >
                                <ToggleButton
                                    value="all"
                                    variant="outline-primary"
                                >
                                    All
                                </ToggleButton>
                                <ToggleButton
                                    value="incomplete"
                                    variant="outline-primary"
                                >
                                    Incomplete
                                </ToggleButton>
                                <ToggleButton
                                    value="complete"
                                    variant="outline-primary"
                                >
                                    Complete
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </Form.Group>
                </div>
                <div className="float-right">
                    <Form.Group controlId="sortBy">
                        <Form.Label>Sort by:</Form.Label>
                        <div>
                            <Form.Control as="select" custom>
                                <option value="createdAt:asc">
                                    Created At (Oldest first)
                                </option>
                                <option value="createdAt:desc">
                                    Created At (Newest first)
                                </option>
                                <option value="updatedAt:asc">
                                    Updated At (Oldest first)
                                </option>
                                <option value="updatedAt:desc">
                                    Updated At (Newest first)
                                </option>
                            </Form.Control>
                        </div>
                    </Form.Group>
                </div>
            </Col>

            {!loading && errorMessage && (
                <Col sm={12}>
                    <Alert variant="danger">{errorMessage}</Alert>
                </Col>
            )}

            {!loading && !errorMessage && (
                <Fragment>
                    {tasks.length === 0 && (
                        <Col sm={12} className="text-center">
                            <p>No tasks found</p>
                        </Col>
                    )}

                    {tasks.length > 0 && (
                        <Col sm={12}>
                            <p>Total records: {totalRecords}</p>
                        </Col>
                    )}

                    <Col sm={12}>
                        {tasks.map((task) => (
                            <Task
                                task={task}
                                key={task._id}
                                onDelete={fetchTasks}
                                onUpdate={fetchTasks}
                            />
                        ))}
                    </Col>

                    <Col sm={12} className="my-2">
                        {totalRecords > 0 && (
                            <div className="float-left">
                                <Form.Group controlId="perPage">
                                    <Form.Label>Per page:</Form.Label>
                                    <Form.Control as="select" custom>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        )}

                        <div className="float-right">Pagination</div>
                    </Col>
                </Fragment>
            )}

            {addTask && (
                <TaskForm
                    task={{}}
                    onClose={taskFormCloseHandler}
                    onSave={fetchTasks}
                    onDelete={fetchTasks}
                />
            )}
        </Row>
    );
};

export default Tasks;
