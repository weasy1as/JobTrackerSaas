# Kanban Board Feature

This feature implements the first iteration of the JobFlow Kanban dashboard using local dummy data and client-side drag-and-drop.

Components:

- `KanbanBoard.tsx` — board state, drag events, and columns layout
- `KanbanColumn.tsx` — droppable status column container
- `JobCard.tsx` — draggable job card display
- `dummy-jobs.ts` — local job data for the initial UI
- `types.ts` — shared job types and status definitions

This feature is intentionally isolated from Supabase and backend integration.
