import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <main className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-semibold mb-8">Design Portfolio</h1>

      {error && (
        <p className="text-red-500">Failed to load projects: {error.message}</p>
      )}

      {!error && projects?.length === 0 && (
        <p className="text-neutral-500">
          No projects yet. Add rows to the{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded">
            projects
          </code>{" "}
          table in Supabase to see them here.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <div key={project.id} className="flex flex-col gap-2">
            {project.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            )}
            <h2 className="font-medium">{project.title}</h2>
            {project.description && (
              <p className="text-sm text-neutral-500">{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
