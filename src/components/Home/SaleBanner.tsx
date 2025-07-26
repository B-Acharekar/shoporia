const SaleBanner = () => {
  return (
    <section className="bg-white text-black text-center py-10 border-b border-zinc-200">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Mid-Year Sale – Save up to <span className="text-indigo-600">50%</span>
      </h2>
      <p className="mt-2 text-lg text-zinc-600">
        Premium products. Unbeatable prices. Limited time only.
      </p>
    </section>
  );
};

export default SaleBanner;
