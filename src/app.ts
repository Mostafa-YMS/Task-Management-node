import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const port: number = 7000;

const app: Express = express();

const baseUrl: string = "/api/tasks";
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

interface task {
  id: number;
  title: string;
  description: string;
}

let tasks: Array<task> = [
  {
    id: 1,
    title: "Learn React",
    description: "Learn how to use react in building web app",
  },
  {
    id: 2,
    title: "Learn Node",
    description: "Learn how to use node in building server",
  },
  {
    id: 3,
    title: "Learn Array Manipulation",
    description: "Learn how to manipulate arrays in javascript",
  },
];

let newTaskId: number = 4;

app.listen(port, () => {
  return console.log(`server is running at http://localhost:${port}`);
});

app.get(baseUrl, (req: Request, res: Response) => {
  const query: any = req?.query?.text;
  if (query) {
    const result: Array<task> | undefined = tasks.filter((e) => {
      if (e?.title?.includes(query) || e?.description?.includes(query))
        return true;
    });
    res.status(200);
    res.json(result);
  } else {
    res.status(200);
    res.json(tasks);
  }
});

app.post(baseUrl, (req: Request, res: Response) => {
  const data: task = req?.body;

  if (!data?.title && !data?.description) {
    res.status(302);
    res.json({ message: "Task data is missing" });
  } else if (!data?.title) {
    res.status(302);
    res.json({ message: "Task title is missing" });
  } else if (!data?.description) {
    res.status(302);
    res.json({ message: "Task description is missing" });
  }

  data.id = newTaskId;
  newTaskId++;
  tasks.push(data);

  res.status(200);
  res.json({ message: "success" });
});

app.put(baseUrl, (req: Request, res: Response) => {
  const data: task = req?.body;

  if (!data?.id) {
    res.status(302);
    res.json({ message: "Task id is missing" });
  } else if (!data?.title && !data?.description) {
    res.status(302);
    res.json({ message: "Task title or description is required" });
  }

  const requiredTask: task = tasks.filter((e) => {
    return e.id === Number(data?.id);
  })[0];

  const taskIndex: number = tasks.indexOf(requiredTask);

  if (data.title) requiredTask.title = data.title;
  if (data.description) requiredTask.description = data.description;

  tasks[taskIndex] = requiredTask;

  res.status(200);
  res.json(tasks);
});

app.delete(baseUrl, (req: Request, res: Response) => {
  const id: any = req?.query?.id;

  if (!id) {
    res.status(302);
    res.json({ message: "Task id is missing" });
  }

  tasks = tasks.filter((e) => {
    return e.id !== Number(id);
  });

  res.status(200);
  res.json({ message: "success" });
});

app.use(function (req: Request, res: Response) {
  res.status(404);
  res.send({ error: "Not found" });
});
