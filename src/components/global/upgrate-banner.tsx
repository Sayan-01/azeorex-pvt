const UpgrateBanner = ({ plan }: { plan?: string }) => {
  if (plan && plan !== "Free Plan") return null;
  return (
    <section className="mb-8 md:px-7 px-5 sm:block hidden">
      <div className="bg-[#ffffff08] rounded-xl p-4 flex gap-3 items-center">
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 10.3333L7.375 1V7.66667H11.5L4.625 17V10.3333H0.5Z"
            fill="#726fff"
            stroke="#726fff"
            strokeLinejoin="round"
          ></path>
        </svg>
        <h4>Upgrade to Super today!</h4>
        <p className="md:flex gap-3 items-center text-[13px] text-zinc-500 hidden">
          We improved Spline Super payments in your region.
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Dark / Open Link v2"
              opacity="0.6"
            >
              <path
                id="Vector 1"
                d="M11.4998 4.49977L4.49951 11.5M11.4998 4.49977L11.4998 8.74241M11.4998 4.49977L7.25713 4.49977"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </p>
      </div>
    </section>
  );
};

export default UpgrateBanner;
