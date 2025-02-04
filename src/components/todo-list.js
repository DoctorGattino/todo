import React from "react";

import TodoListItem from "./todo-list-item";

/*       <li>
<TodoListItem label={item.label} important={item.important} />
</li> */

const TodoList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <TodoListItem {...itemProps} />
      </li>
    );
  });

  return <ul>{elements}</ul>;
};

export default TodoList;
