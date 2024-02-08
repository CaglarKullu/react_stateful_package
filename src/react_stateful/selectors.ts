export const selectTodos = (state:any) => state.todos;

export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo:any) => todo.completed)
);


function createSelector(arg0: ((state: any) => any)[], arg1: (todos: any) => any) {
    throw new Error("Function not implemented.");
}
// Assume createSelector is a simplified version or directly utilizes Reselect for memoization
