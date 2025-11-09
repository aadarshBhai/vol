import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ayush Singh',
    position: 'Founder',
    description: 'Founder and visionary behind Volvoro Tour Explorer, driven by a passion for redefining travel with trust, experience, and excellence. Leads the brand with innovation and personalized service to create unforgettable journeys for every traveler.',
    image: '/images/destinations/ayush.jpg',
  },
  {
    id: 2,
    name: 'Puja Singh',
    position: 'Chief Executive Officer',
    description: 'Leads Volvoro Tour Explorer\'s strategic direction with expertise and precision, overseeing key decisions and customer relationships. Ensures every journey reflects Volvoro\'s commitment to quality, professionalism, and exceptional care.',
    image: '/images/destinations/puja.jpg',
  },
  {
    id: 3,
    name: 'Abhijeet Upadhyay',
    position: 'Managing Director',
    description: 'Oversees finance, marketing, and booking operations to ensure smooth coordination and efficient execution across all tours. Drives excellence that keeps Volvoro organized, dependable, and focused on delivering exceptional client experiences.',
    image: '/images/destinations/abhi.jpg',
  },
  {
    id: 4,
    name: 'Aadarsh Mishra',
    position: 'Head of Technology',
    description: 'Manages the website, digital systems, and all tech operations to ensure a seamless, secure, and high-performing experience. Innovates constantly to keep Volvoro ahead in technology and customer convenience.',
    image: '/images/destinations/aadarsh.jpg',
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Team</h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
              className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + 
                      encodeURIComponent(member.name) + 
                      '&background=0D9488&color=fff&size=256';
                  }}
                />
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.position}</p>
              <div className="min-h-[80px] w-full">
                <p className="text-xs text-gray-500 leading-snug text-justify">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
