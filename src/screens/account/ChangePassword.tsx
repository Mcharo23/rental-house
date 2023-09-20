import { useDisclosure, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { getUserAccessToken, getUserData } from "../../utils/localStorageUtils";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { LoginUserInputMutation, useUpdatePasswordInputMutation } from "../../generated/graphql";


function ChangePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
   const navigate = useNavigate();
   const [oldPassword,setOldPassword]=useState("")
   const [newPassword,setNewPassword]=useState("")
   const [accessToken, setAccessToken] = useState<string | null>(
     getUserAccessToken()
   );
   const queryClient = useQueryClient();
   const [user, setUser] = useState<LoginUserInputMutation | null>(
     getUserData() ?? null
   );
   

   useEffect(() => {
     const userdata = getUserData();
     console.log(userdata?.login.accessToken);
     setUser(userdata);
   }, []);

   const { mutate } = useUpdatePasswordInputMutation(
     graphqlRequestClient.setHeaders({
       Authorization: `Bearer ${accessToken}`,
     }),
     {
       onSuccess: () => {
         queryClient.invalidateQueries(["createUserInput"]);
         return success("data updated successfully");
       },
       onError: () => {
         return errorDisplay("Update failed!!");
       },
     }
   );
   const errorDisplay = (errorMessage: string) => {
     notifications.show({
       title: "Oops!!",
       message: `${errorMessage}`,
       styles: (theme: { colors: { red: any[] }; white: any }) => ({
         root: {
           backgroundColor: theme.colors.red[6],
           borderColor: theme.colors.red[6],

           "&::before": { backgroundColor: theme.white },
         },

         title: { color: theme.white },
         description: { color: theme.white },
         closeButton: {
           color: theme.white,
           "&:hover": { backgroundColor: theme.colors.red[7] },
         },
       }),
       autoClose: 5000,
     });
   };
   const success = (feedback: string) => {
     notifications.show({
       title: "",
       message: `${feedback}`,
       styles: (theme: { colors: { green: any[] }; white: any }) => ({
         root: {
           backgroundColor: theme.colors.green[6],
           borderColor: theme.colors.green[6],

           "&::before": { backgroundColor: theme.white },
         },

         title: { color: theme.white },
         description: { color: theme.white },
         closeButton: {
           color: theme.white,
           "&:hover": { backgroundColor: theme.colors.green[7] },
         },
       }),
       autoClose: 3000,
     });
     setTimeout(() => {
      //  navigate("/");
     }, 3000);
   };
   const handleChangePassword = () => {
     if (oldPassword.length === 0 || newPassword.length === 0) {
       errorDisplay("Fill all fields to continue");
     } else if (newPassword.toString().length < 8) {
       errorDisplay("Invalid password,put a strong password");
     } else {
        
       mutate({
         input: {
           currentpassword: oldPassword,
           newPassword: newPassword
         },
       });
       onClose();
     }
   };


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <p onClick={onOpen} className="text-blue-500 hover:cursor-pointer">
        Change Password
      </p>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Input fields with labels */}
            <FormControl>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="text"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old Password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new Password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleChangePassword} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePassword;
