import { Box, Button, Container, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target='_blank'
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function Footer() {
  return (
    <Box bgColor={useColorModeValue('blue.100', 'blue.900')} w='full'>
      <Container
        as={Stack}
        py={4}
        spacing={4}
        maxW='6xl'
        justify='space-between'
        align='center'
        direction='row'
      >
        <Text>Copyright &copy; 2022 Nicola Racco</Text>
        <Stack direction='row' spacing={6}>
          <SocialButton label='Github' href='https://github.com/sbam-tools/notes'>
            <FontAwesomeIcon icon={faGithub} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
