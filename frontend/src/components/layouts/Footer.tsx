export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 px-[5%] flex justify-center items-center bg-secondary/10">
      <div className="flex flex-col items-center">
        <span className="font-semibold text-xl text-primary">
          LAPTOP STORE INHIL
        </span>
        <p className="text-sm">
          <span className="font-medium text-black">&copy; {year}</span>, Laptop
          store inhil all rights reserved
        </p>
      </div>
    </footer>
  );
}
