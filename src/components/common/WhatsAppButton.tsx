import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi Volvoro Team! I'd like to enquire about your travel packages.");
    window.location.href = `https://api.whatsapp.com/send?phone=918434903291&text=${message}`;
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.2 }
      }}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </motion.button>
  );
};

export default WhatsAppButton;
