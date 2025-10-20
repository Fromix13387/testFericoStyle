<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
class TaskUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array
    {
        return [
            'title' => ['sometimes','required','string','max:255'],
            'description' => ['sometimes','nullable','string'],
            'status' => ['sometimes','required','in:'.implode(',', array_column(TaskStatus::cases(),'value'))],
        ];
    }
}
