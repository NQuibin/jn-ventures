export default function PageFooter() {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto">
      <div className="mt-12 p-6 bg-neutral-600 text-center">
        <small className="text-white">© {thisYear} Nikki Louis Quibin</small>
      </div>
    </footer>
  );
}
