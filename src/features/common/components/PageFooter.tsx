export default function PageFooter() {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-600 w-full mt-auto p-6 text-center">
      <small className="text-white">© {thisYear} Nikki Louis Quibin</small>
    </footer>
  );
}
