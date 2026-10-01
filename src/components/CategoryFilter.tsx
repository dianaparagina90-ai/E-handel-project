import type { Category } from "../types/types";

function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="flex gap-6 py-4 border-b border-(--border)">
      <button
        onClick={() => onSelect(null)}
        className={
          selected === null
            ? "text-(--accent) border-b-2 border-(--accent)"
            : "text-(--muted-foreground)"
        }
      >
        ALLA
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={
            selected === category.id
              ? "text-(--accent) border-b-2 border-(--accent)"
              : "text-(--muted-foreground)"
          }
        >
          {category.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilter;
