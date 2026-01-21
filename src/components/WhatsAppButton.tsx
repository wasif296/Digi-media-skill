import { Affix, ActionIcon } from '@mantine/core';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => (
  <Affix position={{ bottom: 30, right: 30 }}>
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
      <ActionIcon size={60} radius="xl" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', border: 'none' }} onClick={() => window.open('https://wa.me/923352543404')}>
        <MessageCircle size={30} fill="white" color="white" />
      </ActionIcon>
    </motion.div>
  </Affix>
);
export default WhatsAppButton;