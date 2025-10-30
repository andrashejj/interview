import { useState } from "react";
import { Drawer } from "./ui/Drawer";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Spinner } from "./ui/Spinner";
import { useTodos } from "@/hooks/useTodos";

interface TodosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
}

export function TodosDrawer({
  isOpen,
  onClose,
  userId,
  userName,
}: TodosDrawerProps) {
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const {
    todos,
    isLoading,
    isError,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos(userId);

  const handleCreateTodo = async () => {
    if (!newTodoText.trim()) return;

    try {
      await createTodo.mutateAsync({
        userId,
        todo: newTodoText.trim(),
      });
      setNewTodoText("");
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  const handleToggleTodo = async (todoId: number) => {
    try {
      await toggleTodo.mutateAsync({ id: todoId });
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const handleStartEdit = (todoId: number, currentText: string) => {
    setEditingId(todoId);
    setEditText(currentText);
  };

  const handleSaveEdit = async (todoId: number) => {
    if (!editText.trim()) return;

    try {
      await updateTodo.mutateAsync({
        id: todoId,
        todo: editText.trim(),
      });
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDeleteTodo = async (todoId: number) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo.mutateAsync({ id: todoId });
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`${userName}'s Todos`}>
      {/* Add New Todo */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                void handleCreateTodo();
              }
            }}
            placeholder="Add a new todo..."
            className="flex-1"
          />
          <Button
            onClick={() => void handleCreateTodo()}
            disabled={!newTodoText.trim() || createTodo.isPending}
            variant="primary"
          >
            Add
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Failed to load todos: {error?.message || "Unknown error"}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && todos.length === 0 && (
        <div className="py-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No todos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new todo.
          </p>
        </div>
      )}

      {/* Todos List */}
      {!isLoading && !isError && todos.length > 0 && (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="group rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              {editingId === todo.id ? (
                // Edit Mode
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        void handleSaveEdit(todo.id);
                      }
                      if (e.key === "Escape") {
                        handleCancelEdit();
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => void handleSaveEdit(todo.id)}
                      disabled={!editText.trim() || updateTodo.isPending}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => void handleToggleTodo(todo.id)}
                    className="mt-0.5 shrink-0 focus:outline-none"
                    disabled={toggleTodo.isPending}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                        todo.completed
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 bg-white hover:border-blue-500"
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Todo Text */}
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.todo}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleStartEdit(todo.id, todo.todo)}
                      className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
                      aria-label="Edit todo"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => void handleDeleteTodo(todo.id)}
                      className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none"
                      aria-label="Delete todo"
                      disabled={deleteTodo.isPending}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!isLoading && !isError && todos.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
          {todos.filter((t) => t.completed).length} of {todos.length} completed
        </div>
      )}
    </Drawer>
  );
}
