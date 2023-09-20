import  { useEffect, useState } from "react";
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
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getUserAccessToken, getUserData } from "../../utils/localStorageUtils";
import graphqlRequestClient from "../../lib/clients/graphqlRequestClient";
import { LoginUserInputMutation, useUpdateUserInputMutation } from "../../generated/graphql";

function ChangeEmail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(
    getUserAccessToken()
  );
  const queryClient = useQueryClient();
  const [user, setUser] = useState<LoginUserInputMutation | null>(
    getUserData() ?? null
  );
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  
  
  useEffect(()=>{
    const userdata=getUserData();
    console.log(userdata?.login.accessToken);
    setUser(userdata)
  },[])


   const { mutate } = useUpdateUserInputMutation(
     graphqlRequestClient.setHeaders({
       Authorization: `Bearer ${accessToken}`,
     }),
     {
       onSuccess: () => {
         queryClient.invalidateQueries(["createUserInput"]);
         return success("data updated successfully,login to apply changes!!");
       },
       onError: () => {
         return errorDisplay("Update failed!!")
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
       navigate("/")
     }, 3000);
   };
    const handleSaveData = () => {
      if(number.length===0 || email.length===0){
        errorDisplay("Fill all fields to continue")
      }else if( number.toString().length !==9){
        errorDisplay("Invalid number,country code is automatically added")
      }else{
        const newNumber="+255"+number
        mutate({
          input: {
            phoneNumber: newNumber,
            username: email,
          },
        });
        onClose();
      }
      
          
         
    };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <p onClick={onOpen} className="text-blue-500 hover:cursor-pointer">
        Change Email & PhoneNumber
      </p>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Input fields with labels */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user?.login.user.username}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder={user?.login.user.phoneNumber}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveData}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeEmail;
