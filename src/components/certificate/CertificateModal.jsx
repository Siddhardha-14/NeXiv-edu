import React, { useMemo } from 'react';
import { Award, X, Printer, Download, CircleCheckBig } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';

export default function CertificateModal() {
  const { user, courses } = useAuth();
  const { params, navigate } = useNavigation();
  const { courseId } = params || {};

  const course = courses.find(c => c.id === courseId);

  // Generate a mock verification hash on load
  const token = useMemo(() => {
    return "NEX-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
  }, []);

  if (!user || !course) {
    return (
      <div className="min-h-screen bg-[var(--bg-root)] flex flex-col items-center justify-center p-6 text-center">
        <Award className="w-12 h-12 text-[var(--accent)] mb-3" />
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Certificate Not Found</h2>
        <button
          onClick={() => navigate('student-dashboard')}
          className="mt-4 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold uppercase rounded-xl transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const score = user.quizScores[course.id] || 95;
  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Verifiable PDF downloaded successfully!\nVerification Token: ${token}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-root)] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-[var(--bg-surface)] rounded-3xl shadow-xl max-w-3xl w-full border border-[var(--border-default)] overflow-hidden my-4 relative animate-fade-in no-print">
        
        {/* Modal topbar */}
        <div className="p-4 bg-[var(--bg-inset)] flex items-center justify-between border-b border-[var(--border-default)]">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
              Digital Certificate
            </span>
          </div>
          <button
            onClick={() => navigate('student-dashboard')}
            className="p-1.5 hover:bg-[var(--bg-elevated)] rounded-xl transition text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Frame Section */}
        <div className="p-6 md:p-10 bg-[var(--bg-root)]">
          
          {/* Print container layout */}
          <div className="border-[10px] border-double border-[var(--accent)] p-6 md:p-10 text-center bg-[#FAF9F5] rounded-2xl relative overflow-hidden select-text text-zinc-950 shadow-sm print-cert-container">
            <div className="absolute inset-0 bg-contain bg-center opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400')] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="space-y-1">
                <span className="text-[8px] font-mono tracking-[0.25em] uppercase font-bold text-zinc-400 block">
                  Certificate of Achievement
                </span>
                <h1 className="text-lg md:text-xl font-bold tracking-tight font-sans uppercase text-zinc-900">
                  NeXiv Institute of Technology
                </h1>
                <p className="text-[9px] font-serif italic text-zinc-400 leading-none">
                  Verified Online Learning Syllabus
                </p>
              </div>

              <div className="w-16 h-[1px] bg-zinc-300 my-1" />
              <p className="text-[9px] font-serif uppercase tracking-widest text-zinc-400 font-bold leading-none">
                This certifies that
              </p>
              
              <h2 className="text-xl md:text-3xl font-extrabold tracking-tight font-serif text-zinc-900 border-b border-zinc-300 pb-1.5 px-4 whitespace-nowrap">
                {user.name}
              </h2>
              
              <p className="text-zinc-500 text-[10px] leading-relaxed font-serif">
                has successfully completed all requirements and demonstrated proficiency in
              </p>
              
              <h3 className="text-sm md:text-base font-bold tracking-tight text-indigo-950 uppercase font-sans bg-indigo-50/70 border border-indigo-200/50 px-4 py-2 rounded-xl">
                {course.title}
              </h3>
              
              <p className="text-zinc-600 text-[10px] font-serif font-medium leading-relaxed">
                and demonstrated mastery of the material with a final score of{' '}
                <strong className="text-zinc-900 font-sans font-bold text-xs">{score}%</strong>.
              </p>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-md mt-4 pt-4 border-t border-zinc-200/60 text-left text-zinc-400 text-[8px]">
                <div className="space-y-1">
                  <div className="font-serif italic text-zinc-900 text-xs font-bold border-b border-zinc-300/80 pb-0.5">
                    Alex Rivera
                  </div>
                  <span className="block font-bold uppercase tracking-wider text-[7px]">Lead Instructor</span>
                  <span className="block font-mono text-[7px] text-zinc-400">NeXiv Academic Board</span>
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-bold text-zinc-900 text-xs border-b border-zinc-300/80 pb-0.5 font-mono leading-none py-[3px]">
                    {date}
                  </div>
                  <span className="block font-bold uppercase tracking-wider text-[7px]">Verification Date</span>
                  <span className="block font-sans text-emerald-600 font-bold text-[7px] flex items-center gap-0.5 leading-none">
                    <CircleCheckBig className="w-2.5 h-2.5 text-emerald-500 shrink-0" /> Verified Credential
                  </span>
                </div>
              </div>

              {/* Verification Token */}
              <div className="mt-4 text-center bg-zinc-100/80 border border-zinc-200/65 px-3 py-1 rounded select-all w-full max-w-xs">
                <span className="text-[7px] font-mono tracking-widest font-bold text-zinc-400 block uppercase">
                  Certificate verification token:
                </span>
                <span className="text-[7px] font-mono font-bold text-zinc-600 block select-all tracking-tight mt-0.5">
                  {token}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Panel Footer */}
        <div className="p-4 bg-[var(--bg-inset)] border-t border-[var(--border-default)] flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            Secured via digital checksum validation.
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handlePrint}
              icon={Printer}
            >
              Print
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              icon={Download}
            >
              Download
            </Button>
          </div>
        </div>

      </div>

      {/* Styled Printable Version (Invisible on screen, visible on window.print()) */}
      <div className="hidden print:block w-[100%] mx-auto bg-white p-12 text-zinc-950 font-serif text-center relative border-[12px] border-double border-zinc-800 rounded-none h-full">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold text-zinc-400 block mb-2">
          Certificate of Achievement
        </span>
        <h1 className="text-2xl font-bold font-sans uppercase text-zinc-900 tracking-tight mb-1">
          NeXiv Institute of Technology
        </h1>
        <p className="text-xs italic text-zinc-400 mb-6">Verified Learning Platform</p>
        <div className="w-20 h-[1px] bg-zinc-300 mx-auto my-4" />
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-4">This certifies that</p>
        <h2 className="text-3xl font-extrabold text-zinc-900 border-b-2 border-zinc-900 pb-2 px-6 inline-block my-4">
          {user.name}
        </h2>
        <p className="text-zinc-500 text-xs leading-relaxed max-w-md mx-auto mb-4">
          has demonstrated proficiency and completed all assignments for the program
        </p>
        <h3 className="text-lg font-bold text-zinc-900 uppercase font-sans bg-zinc-100 border border-zinc-300 px-6 py-3 rounded-lg inline-block my-2">
          {course.title}
        </h3>
        <p className="text-zinc-600 text-xs my-4">
          achieving a grade of <strong className="text-zinc-900 text-sm font-sans font-bold">{score}%</strong>.
        </p>
        
        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 w-full max-w-lg mx-auto mt-12 pt-8 border-t border-zinc-200 text-left text-zinc-400 text-[9px]">
          <div className="space-y-1">
            <div className="italic text-zinc-900 text-sm font-bold border-b border-zinc-300 pb-1">Alex Rivera</div>
            <span className="block font-bold uppercase tracking-widest text-[8px]">Lead Instructor</span>
            <span className="block font-mono text-zinc-400 text-[8px]">NeXiv Academic Board</span>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-zinc-900 text-sm border-b border-zinc-300 pb-1 font-mono">{date}</div>
            <span className="block font-bold uppercase tracking-widest text-[8px]">Verification Date</span>
            <span className="block font-sans text-emerald-600 font-extrabold text-[8px]">Digitally Signed & Verified</span>
          </div>
        </div>

        {/* Verification Token */}
        <div className="mt-8 text-center bg-zinc-100 border border-zinc-200 px-4 py-2 rounded max-w-md mx-auto">
          <span className="text-[8px] font-mono tracking-widest font-bold text-zinc-400 block uppercase">
            Certificate verification token ID:
          </span>
          <span className="text-[8px] font-mono font-bold text-zinc-700 block mt-1">{token}</span>
        </div>
      </div>

    </div>
  );
}
