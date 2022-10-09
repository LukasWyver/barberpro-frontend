import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FiUser, FiScissors } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { ScheduleItem } from "../../pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader color="white" fontSize="md">
          Próximo
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex align="center" mb={3}>
            <FiUser size={28} color="#ffb13e" />
            <Text ml={3} fontSize="lg" color="white" fontWeight="bold">
              {data?.customer}
            </Text>
          </Flex>

          <Flex align="center" mb={3}>
            <FiScissors size={28} color="#c6c6c6" />
            <Text ml={3} fontSize="lg" color="white" fontWeight="bold">
              {data?.haircut.name}
            </Text>
          </Flex>

          <Flex align="center" mb={3}>
            <BsCashCoin size={28} color="#46ef75" />
            <Text ml={3} fontSize="lg" color="white" fontWeight="bold">
              R$ {data?.haircut.price}
            </Text>
          </Flex>

          <ModalFooter>
            <Button
              size="lg"
              color="white"
              bg="button.cta"
              _hover={{ bg: "#ffb13e" }}
              _active={{ color: "gray.100" }}
              onClick={() => finishService()}
            >
              Finalizar Serviço
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
