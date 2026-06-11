import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

const page = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid w-full gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <MobileNavigation />
        <FloatingSidebar />

        <h1 className="text-center">analytics page</h1>
      </div>
    </main>
  );
};

export default page;
