import { Pencil, Trash } from "lucide-react";
import { useUrlStore } from "../store";

export default function UrlTable({ urls }) {
  const remove = useUrlStore((s) => s.remove);

  /* build full short URL for display */
  const origin8080 = window.location.origin.replace("5173", "8080");

  return (
    <div className="overflow-x-auto">
      {/* header row for md breakpoint */}
      <div className="hidden md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-4 mb-2 font-medium text-sm text-gray-600">
        <div>Short URL</div>
        <div>Original URL</div>
        <div>Clicks</div>
        <div>Created Date</div>
        <div>Expiration</div>
        <div>Actions</div>
      </div>

      {urls.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No URLs found</div>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <div
              key={url.id}
              className="md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr] gap-4 p-4 border border-gray-200 rounded-lg bg-white"
            >
              <div className="md:hidden font-medium mb-1">Short URL</div>
              <div className="text-sm font-medium">
                {origin8080}/{url.shortCode}
              </div>

              <div className="md:hidden font-medium mt-3 mb-1">Original URL</div>
              <div className="text-sm text-gray-600 truncate">{url.originalUrl}</div>

              <div className="md:hidden font-medium mt-3 mb-1">Clicks</div>
              <div className="text-sm">{url.clicks}</div>

              <div className="md:hidden font-medium mt-3 mb-1">Created Date</div>
              <div className="text-sm">{url.createdAt}</div>

              <div className="md:hidden font-medium mt-3 mb-1">Expiration</div>
              <div className="text-sm">{url.expiresAt}</div>

              <div className="md:hidden font-medium mt-3 mb-1">Actions</div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <button className="p-1 text-gray-600 hover:text-gray-900">
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => remove(url.id)}
                  className="p-1 text-gray-600 hover:text-gray-900"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

