"use client";

interface MemberProps {
  name: string;
  role: string;
  image: string;
}

export default function TeamCard({ name, role, image }: MemberProps) {
  return (
    <div
      className="group relative rounded-lg h-120 w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold">{name}</h3>
        <p className="text-white text-sm uppercase tracking-wider">{role}</p>
      </div>
    </div>
  );
}
