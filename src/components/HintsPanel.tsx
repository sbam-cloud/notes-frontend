import { Box } from "@chakra-ui/react"

const HintsPanel = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Box marginLeft={{ md: 5 }} p={{ md: 5 }} sx={{ gap: 25 }} whiteSpace={{ md: 'nowrap' }} order={{ md: 1 }} lineHeight={2} fontSize='sm'>
    {children}
  </Box>
);

export default HintsPanel;
