import { getSubmissions, Submission } from "./actions";
import SubmissionsTable from "./components/submissions-table";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let submissions: Submission[] = [];
  let error: string | null = null;

  try {
    submissions = await getSubmissions();
  } catch (e) {
    console.error("Failed to fetch submissions:", e);
    error = e instanceof Error ? e.message : "An unknown error occurred.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submissions Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all CV submissions from this dashboard.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          <h3 className="font-semibold">Failed to load submissions</h3>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <SubmissionsTable initialSubmissions={submissions} />
      )}
    </div>
  );
}
