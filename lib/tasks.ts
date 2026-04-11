export interface Task {
  id: string;
  title: string;
  description: string;
  expected_output_type: "IMAGE" | "POSTER" | "TEXT";
  difficulty: "LOW" | "MEDIUM";
}

// Static task definitions — add/edit tasks here manually
export const TASKS: Task[] = [
  {
    id: "task_poster_event",
    title: "Event Poster",
    description: "Design a promotional poster for a public event.",
    expected_output_type: "POSTER",
    difficulty: "MEDIUM",
  },
  {
    id: "task_story_short",
    title: "Short Story",
    description: "Write a short story based on a given theme or prompt.",
    expected_output_type: "TEXT",
    difficulty: "LOW",
  },
  {
    id: "task_image_product",
    title: "Product Image",
    description: "Generate a product image concept with style and composition details.",
    expected_output_type: "IMAGE",
    difficulty: "MEDIUM",
  },
  {
    id: "task_text_description",
    title: "Product Description",
    description: "Write a compelling product description for an e-commerce listing.",
    expected_output_type: "TEXT",
    difficulty: "LOW",
  },
];

export function getTask(id: string): Task | undefined {
  return TASKS.find((t) => t.id === id);
}
