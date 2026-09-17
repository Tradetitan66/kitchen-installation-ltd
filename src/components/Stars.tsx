export default function Stars({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${className} text-[#e8a33d]`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.05 2.933c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.363 1.118l1.07 3.292c.3.922-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.783.57-1.838-.195-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
        </svg>
      ))}
    </span>
  );
}