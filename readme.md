# Task Managment

> ### Base url is localhost:7000/api

## Apis

1.  list tasks:

        method: get

        endpoint: /tasks

        returns array of objects

    > task object has the parameters: id, title, description

2.  search:

        method: get

        endpoint: /tasks

        query: text

        returns array of objects

3.  create task:

        method: post

        endpoint: /tasks

        body: must contain title and description

        returns: message "success"

4.  update task:

        method: put

        endpoint: /tasks

        body: contain id and one or both title and description

        returns: message "success"

5.  delete task:

        method: delete

        endpoint: /tasks

        query: id

        returns: message "success"
