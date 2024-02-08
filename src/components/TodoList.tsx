import React from 'react';
import { useStoreSelector } from '@/react_stateful/useStoreSelector';
import { selectCompletedTodos } from '@/react_stateful/selectors';

export const TodoList = () => {
    const completedTodos = useStoreSelector(selectCompletedTodos);

    return (
        <ul>
            {completedTodos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};
