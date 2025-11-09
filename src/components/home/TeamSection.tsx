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
    name: 'Aadarsh Mishra',
    position: 'Founder & CEO',
    description: 'Passionate about creating unforgettable travel experiences with a personal touch.',
    image: '/images/team/aadarsh.jpg',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'Travel Consultant',
    description: 'Expert in crafting personalized itineraries that capture the essence of each destination.',
    image: '/images/team/priya.jpg',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    position: 'Operations Head',
    description: 'Ensuring seamless travel experiences with attention to every detail.',
    image: '/images/team/rahul.jpg',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    position: 'Customer Success',
    description: 'Dedicated to making your travel planning process smooth and enjoyable.',
    image: '/images/team/neha.jpg',
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Passionate travel experts dedicated to creating your perfect journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-gray-100">
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
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-teal-600 mb-3">{member.position}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
