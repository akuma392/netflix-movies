const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Netflix Movie App
        </p>
        <p>Powered by uNoGS API and IMDb</p>
        <p>Developed with Next.js, Tailwind CSS, and Node.js.</p>
        <p>
          <a href="/privacy-policy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
