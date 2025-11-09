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
    description: 'The visionary force behind Volvoro Tour Explorer. His passion for exploring the world through travel inspired the creation of a brand built on trust, experience, and excellence.',
    image: '/images/destinations/ayush.jpg',
  },
  {
    id: 2,
    name: 'Puja Singh',
    position: 'Chief Executive Officer',
    description: 'Guides the company\'s strategic direction with expertise and precision. Focuses on key decisions, customer relationships, and maintaining Volvoro\'s standards of professionalism and reliability.',
    image: '/images/destinations/puja.jpg',
  },
  {
    id: 3,
    name: 'Abhijeet Upadhyay',
    position: 'Managing Director',
    description: 'Responsible for finance, marketing, and booking coordination. Ensures that every process — from tour planning to execution — runs efficiently with a strong focus on operational excellence.',
    image: '/images/destinations/abhi.jpg',
  },
  {
    id: 4,
    name: 'Aadarsh Mishra',
    position: 'Head of Technology',
    description: 'Managing the website, digital systems, and all tech-related operations. His technical expertise ensures a smooth, secure, and user-friendly online experience for every customer. Aadarsh\'s innovative approach keeps Volvoro ahead in digital performance and customer convenience.',
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
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
              <p className="text-xs text-gray-500 line-clamp-2 h-10">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
