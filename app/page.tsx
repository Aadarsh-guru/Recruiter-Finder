import data from "@/lib/recuiters.json";
import RecruitersTable from "@/components/RecruitersTable";

const Home = async () => {

  return (
    <main className='min-h-screen w-full p-6 lg:p-8' >
      <RecruitersTable data={data} />
      <div className="mt-8 p-4 border border-l-4 border-l-blue-500 rounded">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">Notice to Recruiters</h2>
        <p className="text-gray-700 dark:text-gray-500">
          If you are a recruiter and have found your contact information or details on our site that you would like removed, please don't hesitate to reach out to us. We respect your privacy and will promptly address your request.
          To have your information removed, please contact us at: <span className="font-bold text-blue-600">{process.env.NEXT_PUBLIC_ADMIN_EMAIL as string}</span> We are committed to maintaining accurate and up-to-date information and will remove your details immediately upon verification of your request.
        </p>
      </div>
    </main>
  );
};

export default Home;