import {
  FaUsers,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaLightbulb,
  FaProjectDiagram,
  FaRocket,
  FaQuoteRight,
  FaUniversity,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 md:px-16 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-yellow-400 flex items-center justify-center gap-3">
          <FaUniversity /> About AlumNexus
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          A Unified Platform for Alumni Engagement and Student Career
          Acceleration
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaLightbulb className="text-yellow-500" /> Introduction
        </h2>
        <p className="leading-relaxed">
          AlumNexus is a centralized alumni portal that connects students with
          placed alumni across all branches to promote knowledge sharing, career
          guidance, and mentorship. It empowers students to access real alumni
          experiences, interview strategies, success stories, and mock interview
          opportunities, while also creating a strong ecosystem of resources to
          boost confidence and preparation.
        </p>
      </section>

      {/* Problem Statement */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaUsers className="text-red-500" /> Problem Statement
        </h2>
        <p className="leading-relaxed">
          Critical placement resources and alumni experiences are scattered
          across informal channels, making it difficult for students to seek
          reliable guidance or mentorship. This lack of a centralized platform
          results in underprepared students, less confidence, and limited access
          to genuine job referrals and professional networks.
        </p>
      </section>

      {/* Proposed Solution */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaProjectDiagram className="text-green-500" /> Proposed Solution
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Mock Interview Scheduler:</strong> Book one-on-one practice
            sessions with alumni and receive personalized feedback.
          </li>
          <li>
            <strong>Advanced Alumni Directory:</strong> Search and filter alumni
            by company, role, or skills to find the right mentor.
          </li>
          <li>
            <strong>Trusted Job & Referral Board:</strong> Access exclusive
            opportunities posted by verified alumni.
          </li>
          <li>
            <strong>Audio & Podcast Sharing:</strong> Alumni can share their
            experiences via voice; students can listen or read transcripts.
          </li>
        </ul>
      </section>

      {/* Technologies */}
      <section className="mb-12 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FaLaptopCode className="text-blue-500" /> Frontend
          </h2>
          <p>Built with React.js for a dynamic and responsive user interface.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FaServer className="text-purple-500" /> Backend
          </h2>
          <p>
            Powered by Node.js and Express.js to deliver a robust RESTful API
            and business logic.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FaDatabase className="text-green-600" /> Database
          </h2>
          <p>
            MongoDB provides flexible and scalable data storage with Mongoose
            for schema modeling.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <FaUsers className="text-pink-500" /> Security
          </h2>
          <p>JWT tokens ensure secure authentication and user sessions.</p>
        </div>
      </section>

      {/* Future Scope */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaRocket className="text-indigo-500" /> Future Scope
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Complete student and alumni dashboard development.</li>
          <li>Allow alumni to create detailed profiles and share resources.</li>
          <li>Integrate resource sharing for placement materials & mock tests.</li>
          <li>Secure student registration and login system.</li>
          <li>Enable mentorship and networking features for long-term support.</li>
          <li>Conduct testing and bug fixing for smooth user experience.</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FaQuoteRight className="text-primary" /> Conclusion
        </h2>
        <p className="leading-relaxed">
          AlumNexus serves as a centralized bridge between students and alumni,
          offering authentic guidance, mentorship, and opportunities for career
          growth. By fostering networking and knowledge sharing, it ensures
          students are better prepared and confident in their professional
          journeys.
        </p>
      </section>
    </div>
  );
}

export default About;
