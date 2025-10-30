import { api } from "@/utils/api";

export function useTodos(userId: number | undefined) {
  const utils = api.useUtils();

  const query = api.todo.getTodosByUserId.useQuery(
    { userId: userId! },
    {
      enabled: !!userId,
    },
  );

  const createTodo = api.todo.createTodo.useMutation({
    onMutate: async (newTodo) => {
      // Cancel outgoing refetches
      await utils.todo.getTodosByUserId.cancel({ userId: userId! });

      // Snapshot the previous value
      const previousTodos = utils.todo.getTodosByUserId.getData({
        userId: userId!,
      });

      // Optimistically update
      if (previousTodos) {
        utils.todo.getTodosByUserId.setData({ userId: userId! }, [
          {
            id: Date.now(), // Temporary ID
            todo: newTodo.todo,
            completed: false,
            userId: userId!,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...previousTodos,
        ]);
      }

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          context.previousTodos,
        );
      }
    },
    onSettled: () => {
      // Refetch after mutation
      void utils.todo.getTodosByUserId.invalidate({ userId: userId! });
      void utils.user.getUserById.invalidate({ id: userId! });
    },
  });

  const updateTodo = api.todo.updateTodo.useMutation({
    onMutate: async (updatedTodo) => {
      await utils.todo.getTodosByUserId.cancel({ userId: userId! });

      const previousTodos = utils.todo.getTodosByUserId.getData({
        userId: userId!,
      });

      if (previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          previousTodos.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
          ),
        );
      }

      return { previousTodos };
    },
    onError: (_err, _updatedTodo, context) => {
      if (context?.previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          context.previousTodos,
        );
      }
    },
    onSettled: () => {
      void utils.todo.getTodosByUserId.invalidate({ userId: userId! });
      void utils.user.getUserById.invalidate({ id: userId! });
    },
  });

  const deleteTodo = api.todo.deleteTodo.useMutation({
    onMutate: async (deletedTodo) => {
      await utils.todo.getTodosByUserId.cancel({ userId: userId! });

      const previousTodos = utils.todo.getTodosByUserId.getData({
        userId: userId!,
      });

      if (previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          previousTodos.filter((todo) => todo.id !== deletedTodo.id),
        );
      }

      return { previousTodos };
    },
    onError: (_err, _deletedTodo, context) => {
      if (context?.previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          context.previousTodos,
        );
      }
    },
    onSettled: () => {
      void utils.todo.getTodosByUserId.invalidate({ userId: userId! });
      void utils.user.getUserById.invalidate({ id: userId! });
    },
  });

  const toggleTodo = api.todo.toggleTodo.useMutation({
    onMutate: async (toggledTodo) => {
      await utils.todo.getTodosByUserId.cancel({ userId: userId! });

      const previousTodos = utils.todo.getTodosByUserId.getData({
        userId: userId!,
      });

      if (previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          previousTodos.map((todo) =>
            todo.id === toggledTodo.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        );
      }

      return { previousTodos };
    },
    onError: (_err, _toggledTodo, context) => {
      if (context?.previousTodos) {
        utils.todo.getTodosByUserId.setData(
          { userId: userId! },
          context.previousTodos,
        );
      }
    },
    onSettled: () => {
      void utils.todo.getTodosByUserId.invalidate({ userId: userId! });
      void utils.user.getUserById.invalidate({ id: userId! });
    },
  });

  return {
    todos: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}
