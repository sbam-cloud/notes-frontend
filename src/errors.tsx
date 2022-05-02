import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Heading, List, ListItem, UnorderedList } from "@chakra-ui/react";

export const NotFoundError = () => (
  <Alert status='error'>
    <AlertIcon />
    <Box>
      <AlertTitle>Message not found or invalid secret</AlertTitle>
      <AlertDescription>
        <UnorderedList>
          <ListItem>Make sure you correctly typed the URL and the id is valid</ListItem>
          <ListItem>Remember you can view a message only once. After it, the message is destroyed permanently</ListItem>
        </UnorderedList>
        If none of the above applies to you, let the author of the note know of this error, because it means your secret note has been compromised.
      </AlertDescription>
    </Box>
  </Alert>
);

export const InternalError = () => (
  <Alert status='error'>
    <AlertIcon />
    <Box>
      <AlertTitle>Something is not working correctly on our behalf</AlertTitle>
      <AlertDescription>We're sorry for the inconvenience. Please try again in a few.</AlertDescription>
    </Box>
  </Alert>
)
