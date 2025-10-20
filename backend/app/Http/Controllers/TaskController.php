<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
class TaskController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/tasks",
     * summary="Список задач текущего пользователя",
     * tags={"Tasks"},
     * security={{"sanctum":{}}},
     * @OA\Response(response=200, description="OK")
     * )
     */
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks;
        return TaskResource::collection($tasks);
    }

    /**
     * @OA\Post(
     * path="/api/tasks",
     * summary="Создать задачу",
     * tags={"Tasks"},
     * security={{"sanctum":{}}},
     * @OA\RequestBody(required=true,@OA\JsonContent(
     * required={"title"},
     * @OA\Property(property="title", type="string"),
     * @OA\Property(property="description", type="string"),
     * @OA\Property(property="status", type="string", enum={"pending","in_progress","done"})
     * )),
     * @OA\Response(response=201, description="Created")
     * )
     */
    public function store(TaskStoreRequest $request)
    {
        $task = $request->user()->tasks()->create($request->validated());
        return (new TaskResource($task))->response()->setStatusCode(201);
    }

    public function show(Request $request, Task $task)
    {
        $this->authorizeTask($request, $task);
        return new TaskResource($task);
    }

    public function update(TaskUpdateRequest $request, Task $task)
    {
        $this->authorizeTask($request, $task);
        $task->update($request->validated());
        return new TaskResource($task);
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorizeTask($request, $task);
        $task->delete();
        return response()->noContent();
    }


    private function authorizeTask(Request $request, Task $task): void
    {
        abort_unless($task->user_id === $request->user()->id, 403, 'Forbidden');
    }
}
