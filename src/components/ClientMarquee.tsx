import fanfoodLogo from "@/assets/clients/fanfood-logo.png";
import localLogo from "@/assets/uselocal_logo.jpeg";

const ClientMarquee = () => {
   const clients = [
    { name: "FanFood", logo: fanfoodLogo },
    { name: "Local", logo: localLogo },
  ];

  // Only 2 logos, so repeat the set enough times to fill wide screens, then duplicate once more for a seamless loop
  const repeated = Array(8).fill(clients).flat();
  const marqueeClients = [...repeated, ...repeated];

  return (
    <div className="relative overflow-hidden py-5 xs:py-6 sm:py-8 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 px-3 xs:px-4">
      <div
        className="flex gap-6 xs:gap-8 sm:gap-12 min-w-full animate-marquee-loop"
        style={{
          animationDuration: "32s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {marqueeClients.map((client, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-10 lg:px-14"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-10 xs:h-12 sm:h-14 w-auto object-contain rounded-xl mx-auto"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation-name: marquee-loop;
        }
      `}</style>
    </div>
  );
};

export default ClientMarquee;
