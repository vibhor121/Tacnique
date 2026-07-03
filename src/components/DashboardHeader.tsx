type DashboardHeaderProps = {
  userCount: number;
};

const DashboardHeader = ({ userCount }: DashboardHeaderProps) => (
  <header className="mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-900 via-fuchsia-700 to-pink-600 p-8 text-white shadow-soft shadow-purple-200/30 sm:p-10">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">
          dashboard
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">User management made beautiful.</h1>
        <p className="mt-4 text-base leading-7 text-purple-100 sm:text-lg">
          Manage users with a clean, responsive interface. Search, filter, sort, paginate, add, edit, and delete users with ease.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:w-[380px]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Users total</p>
          <p className="mt-3 text-3xl font-semibold">{userCount}</p>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Live controls</p>
          <p className="mt-3 text-3xl font-semibold">Search, sort, filter</p>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
